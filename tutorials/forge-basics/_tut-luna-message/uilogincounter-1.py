# -*- coding: utf-8 -*-
import ui
import luna
from luna.protobuf.ue import login_counter_pb2
from luna.utils import utils

FORGE_NAME = "login_counter"
HEADER = "count"


class LoginCounterWindow(ui.BoardWithTitleBar):
	def __init__(self):
		ui.BoardWithTitleBar.__init__(self)
		luna.RegisterHandler(self.GetWindowHandle(), FORGE_NAME, HEADER, ui.__mem_func__(self.__OnCount))

		self.AddFlag("float")
		self.AddFlag("movable")
		self.SetSize(200, 70)
		self.SetPosition(100, 100)
		self.SetTitleName("Login counter")
		self.SetCloseEvent(ui.__mem_func__(self.Hide))

		self.text = ui.TextLine()
		self.text.SetParent(self)
		self.text.SetPosition(0, 40)
		self.text.SetWindowHorizontalAlignCenter()
		self.text.Show()

	def __del__(self):
		luna.UnregisterHandler(self.GetWindowHandle())
		ui.BoardWithTitleBar.__del__(self)

	def Destroy(self):
		luna.UnregisterHandler(self.GetWindowHandle())
		self.Hide()

	def __OnCount(self, message, receipt):
		msg = utils.Deserialize(login_counter_pb2.GCLoginCount(), message)
		if msg is None:
			return
		self.text.SetText("Login %d, online %d" % (msg.count, msg.online))
		self.Show()
