---
title: Luna on the Python client
description: How to send and receive Luna RPC messages in the Python client using the luna module and protobuf.
---

## The API

The `luna` module is a C++ extension exposed to Python. It manages RPC handlers, but network transmission is delegated to the network stream singleton. You use it to route incoming server messages to your UI windows and to send payloads back to the Forge.

When you build a new feature like a vote system, a recycle window, or a battlepass, you define your own protobuf module, message classes, namespace, and headers in your `.forge` and `.proto` files. You also define your own UI script file paths and child names. The engine does not provide these for custom systems; you author them for your specific needs.

Here is a complete example of a window registering a handler.

```python
class CurseGemWindow(ui.ScriptWindow):

    def __init__(self):
        ui.ScriptWindow.__init__(self)
        self.__Initialize()
        self.__LoadWindow()
        luna.RegisterHandler(self.GetWindowHandle(), "ue_curse_manager", "curse_update", ui.__mem_func__(self.__OnCurseUpdate))

    def __del__(self):
        luna.UnregisterHandler(self.GetWindowHandle())
        ui.ScriptWindow.__del__(self)

    def __Initialize(self):
```

The module surface provides five functions: `RegisterHandler`, `UnregisterHandler`, `Message`, `Response`, and `ClearHandlers`. The engine stores registered handlers in nested maps keyed by namespace and header, containing a list of handler structs (handler ID and callback).

```cpp
void initLuna()
{
    static PyMethodDef s_methods[] =
    {   
        { "RegisterHandler",            lunaRegisterHandler,            METH_VARARGS },
        { "UnregisterHandler",          lunaUnregisterHandler,          METH_VARARGS },
        { "Message",                    lunaMessagePacket,                  METH_VARARGS },
        { "Response",                   lunaResponsePacket,                 METH_VARARGS },
        { "ClearHandlers",              lunaClearHandlers,                  METH_VARARGS },
        { NULL,                 NULL,                           NULL         },
    };

    PyObject * poModule = Py_InitModule("luna", s_methods);
}
```

The handler ID binds a network registration to a specific Python object. The namespace and header strings match the routing keys defined in your `.forge` files.

The `luna.Response` function takes only the serialized message string and the receipt integer. You use it to reply to a specific RPC call. For example, you call `luna.Response(utils.Serialize(msg), receipt)` to send the payload back to the server. The `utils.Serialize` function returns `None` on failure. You must check the result before passing it to `luna.Response`, because the function expects a string and raises a Python exception if it receives `None`.

```cpp
/**
 * \@python \verbatim
def Response(message: str, receipt: int) -> None:
    """
    Sends a Luna response with the given message and receipt ID.

    Args:
        message (str): The response message.
        receipt (int): The receipt ID associated with the response.
    """
\endverbatim
 */
```

## Send

You send an outgoing message to the Forge using `luna.Message`. The function requires the target namespace, the message header, and the serialized protobuf string. It accepts an optional handler ID. To omit the optional handler ID, you pass only the three required positional arguments. To send a message that has no fields, you pass an empty string `""` for the message content. The network stream requires a payload of bytes (std::string in C++), not specifically a string.

The `utils.Serialize` function returns `None` on failure. You must check the result before passing it to `luna.Message`, because the function expects a string. If it receives `None`, `PyArg_ParseTuple` raises a Python exception.

You must also observe the game phase rule. Luna cannot queue messages during the connect-in-progress window. The API provides no event callback to check the current game phase. The network stream drops anything queued during this phase.

To make UI elements like buttons available, you load a UI script file using `ui.PythonScriptLoader().LoadScriptFile(self, "uiscript/vote4buff.py")`. This initializes the window and its children.

```python
def __LoadWindow(self):
    try:
        loader = ui.PythonScriptLoader()
        loader.LoadScriptFile(self, "uiscript/vote4buff.py")
    except:
        import exception
        exception.Abort("Vote4Buff.LoadScript")

    self.board = self.GetChild("board")
    self.board.SetCloseEvent(ui.__mem_func__(self.Close))
```

You bind UI button click events to your send methods using `SetEvent`. `Button.SetEvent` and `DynamicButton.SetEvent` do NOT wrap the callback in `ui.__mem_func__`; they store the callable raw, so it must be wrapped at the call site. You must import the `ui` module to use this wrapper.

This method from the vote system shows a typical send operation. It binds the button, builds the protobuf object, populates the fields, and passes the serialized result to the network stream.

```python
self.btn_redeem = self.GetChild("btn_redeem")
self.btn_redeem.SetEvent(ui.__mem_func__(self._OnRedeemPressed))
```

```python
def _OnRedeemPressed(self):
    self._KillEditFocus()
    nickname = self._GetNickname()
    userid   = self._GetUserId()
    if not nickname and not userid:
        self._Popup(uiScriptLocale.VOTE4BUFF_ERR_NOT_ASSOCIATED)
        return
    msg = vote4buff_pb2.CGVote4BuffRedeem()
    if userid:
        msg.inforge_userid = userid
    else:
        msg.nickname = nickname
    luna.Message(FORGE_NAME, "redeem", utils.Serialize(msg))
```

## Receive

Incoming messages arrive from the server as serialized protobuf strings. You route these messages to your UI class by calling `luna.RegisterHandler`.

The function takes four arguments: a handler ID, the namespace string, the header string as the third argument, and a callback as the fourth argument. You wrap the callback in `ui.__mem_func__` to bind the instance method correctly.

```python
luna.RegisterHandler(self.GetWindowHandle(), FORGE_NAME, "redeem_result",
                     ui.__mem_func__(self.OnRecvRedeemResult))
```

The callback receives two arguments: the serialized message string and a receipt integer. Inside the callback, you convert the raw byte stream into a Python object using `utils.Deserialize`. You pass an empty instance of the expected protobuf message as the first argument and the incoming byte stream as the second argument.

```python
def OnRecvRedeemResult(self, message, receipt):
    res = utils.Deserialize(vote4buff_pb2.GCVote4BuffRedeemResult(), message)
    if res.ok:
        self._Popup(uiScriptLocale.VOTE4BUFF_REDEEM_OK)
    else:
        reason = str(res.reason) if res.reason else uiScriptLocale.VOTE4BUFF_REDEEM_FAIL
        self._Popup(reason)
```

If the byte stream fails to parse, `utils.Deserialize` catches the decode error, logs it to the system error trace using `dbg.TraceError`, and returns `None`. You do not need to log the error again in your callback.

## Registration lifetime

A UI window inherits from exactly `ui.ScriptWindow` or `ui.AutoFocusScriptWindow`. You register handlers in `__init__` before calling `LoadScriptFile` (or any method that calls it, like `__LoadWindow`). This timing is strict. If you register handlers after the UI script loads, you miss messages that arrive in the gap between proxy initialization and UI readiness.

`GetWindowHandle()` returns `self.hWnd`, which is initialized in `__init__` by calling `RegisterWindow`, which registers with the window manager. Calling `GetWindowHandle()` in `__init__` works and is the standard way to register handlers, as the handle is already assigned. `GetWindowHandle()` is valid during `__init__` and is the standard way to register handlers for windows; `id(self)` is an alternative primarily meant for windowless singletons.

When you call `luna.RegisterHandler`, the C++ engine increments the Python object reference count. This keeps the callback alive to receive messages. It also means the object never dies on its own.

You explicitly call `luna.UnregisterHandler` to drop the reference. `luna.UnregisterHandler` drops handlers by the exact ID they were registered with. If a handler was registered with `self.GetWindowHandle()`, it must be unregistered with `self.GetWindowHandle()`. If it was registered with `id(self)`, you unregister with `id(self)`. Skipping unregistration leaves a zombie handler that fires into a half-torn-down window. The client splits window teardown across two methods. You unregister in both `__del__` and `Destroy`.

The `ui.ScriptWindow` class does not have a base `Destroy` method that you need to call. `Destroy()` is a Python-side convention that unregisters luna, closes modals, hides, and resets members. You hide the window by calling `self.Hide()` inside `Destroy()`. UI elements are cleaned up by `Destroy()`, but the window handle is unregistered in `__del__`, which calls `wndMgr.Destroy(self.hWnd)`. 

The `ui.ScriptWindow` class inherits from `ui.Window`. When implementing `__del__`, the base class's `__del__` method must not be called, as it calls wndMgr.Destroy(self.hWnd) which is handled by the base class itself when it is deleted.

## Windowless subsystems

`luna.RegisterHandler` routes messages to a specific window handle ID. A background system or a manager class without a UI window has no handle to register.

These subsystems receive messages through a fallback dispatch. You use `game.py`'s catch-all namespace dispatch to route messages for a system that has no UI window. Land deployment arrives through this fallback and is routed by header to the subsystem's `OnLunaMessage` method.

To hook a windowless subsystem into the `game.py` dispatch, you implement the `OnLunaMessage` method in your class. It must match the signature `def OnLunaMessage(self, header, message, receipt):`.

```python
# luna.RegisterHandler routes by WINDOW handle, and this is not a window, so
# land arrives through game.py's BINARY_LunaMessage fallback.
def OnLunaMessage(self, header, message, receipt):
    if header == "atlas":
        msg = utils.Deserialize(land_pb2.GCAtlas(), message)
        if msg is not None and self.atlas:
            self.atlas.Open(msg.map_index)
```

## Protobuf

The engine uses `proto2` syntax for all Luna protobuf messages, which requires explicit field rules. You define the `.proto` file with `optional` or `required` keywords.

The engine generates Lua and Python bindings automatically. You only author the `.proto` file and run the generation script. You do not write the Lua binding manually.

Generated Protobuf message classes live in the `luna.protobuf` namespace. You import the specific module for your system using its exact path based on the proto file location, such as `from luna.protobuf.ue import vote4buff_pb2`. You instantiate the message class and populate its fields. For example, the vote system uses the exact protobuf message definitions `vote4buff_pb2.CGVote4BuffRedeem()` and `vote4buff_pb2.GCVote4BuffRedeemResult()`. To serialize or deserialize the payload, you import the `utils` module using the exact import statement `from luna.utils import utils`. Importing the `luna.utils` package directly leaves `utils.Deserialize` undefined.

The `utils.Serialize` function takes the populated protobuf message object as its only argument. It wraps the standard `SerializeToString()` method. If serialization fails, it catches the exception, logs the error to the client debug log using the `dbg` module, and returns `None`.

When receiving a message, the payload arrives as a raw byte string. You parse it back into a Python object using `utils.Deserialize`. You pass an empty instance of the expected message class and the incoming byte string. The helper attempts to parse the bytes. If the payload is malformed, it catches the `DecodeError`, logs it, and returns `None`.

```python
import dbg
from google.protobuf.message import DecodeError

def Serialize(pb_message):
    try:
        return pb_message.SerializeToString()
    except Exception as e: 
        dbg.TraceError("Luna protobuf Serialization error: %s" % e)
    return None

def Deserialize(pb_message, pb_bytestream):
    try:
        pb_message.ParseFromString(pb_bytestream)
        return pb_message
    except DecodeError as e:
        dbg.TraceError("Luna protobuf Deserialization error: %s" % e)
    return None
```

## Launcher limits

Luna cannot queue messages during the connect-in-progress window. The API provides no event callback to check the current game phase. If a script attempts to send a message while the loading screen is active, the server never receives it. The network stream drops anything queued during this phase, and this dropping behavior applies equally to `luna.Message` and `luna.Response`.
