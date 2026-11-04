// Loaded from the tutorial's solution files so the homepage cannot drift from them.
// @ts-ignore raw-loader has no type declarations in this project
import forge from "!!raw-loader!@site/tutorials/forge-basics/_tut-luna-message/login_counter-2.forge";
// @ts-ignore
import proto from "!!raw-loader!@site/tutorials/forge-basics/_tut-luna-message/login_counter.proto";
// @ts-ignore
import py from "!!raw-loader!@site/tutorials/forge-basics/_tut-luna-message/uilogincounter-1.py";

const text = (m: unknown): string => {
  const v = (m as { default?: string })?.default ?? m;
  return String(v).replace(/\n$/, "");
};

export const PROTO = text(proto);
export const FORGE = text(forge);
export const PY = text(py);

// Verbatim from the item use policy reference, Quick start.
export const POLICY = `forge trial_items begin
    environment game begin
        local MAP_A = 1
        local handle = forge.sys.game.item_use_policy.register(
            "trial_items",
            function(ch) return ch:get_map_index() == MAP_A end,
            function(ch, item)
                if item:get_vnum() == 100008 then
                    return { allowed = false, reason = "Not on this map." }
                end
                return { allowed = true }
            end)
        return { handle = handle }
    end
end`;
