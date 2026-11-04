import app
import ui

SHADER = "shaders/ui/pulse_ps.hlsl"
SIDE = 220


class TestWindow(ui.Window):
	def __init__(self):
		ui.Window.__init__(self)
		self.SetPosition(300, 200)
		self.SetSize(SIDE, SIDE)
		self.opened = app.GetTime()

		self.quad = ui.ShaderQuad()
		self.quad.SetParent(self)
		self.quad.AddFlag("not_pick")
		self.quad.SetShader(SHADER)
		self.quad.SetPosition(0, 0)
		self.quad.SetSize(SIDE, SIDE)
		self.quad.SetUV(-1.0, -1.0, 1.0, 1.0)
		self.quad.Show()

	def Destroy(self):
		if self.quad:
			self.quad.Hide()
		self.quad = None

	def OnUpdate(self):
		if not self.quad:
			return
		self.quad.SetParams((0.2, 0.75, 1.0, 0.18, 0.9, 5.0, app.GetTime() - self.opened, 0.0,
		                     0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0))
