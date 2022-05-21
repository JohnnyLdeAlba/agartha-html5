
function _level500() {

	this.playable = null;
	this.display_manager = null;
	this.hud_manager = null;
	this.blink = false;

	this.keydown_enter = false;
	this.background = null;
	this.delay_blink = null;
	this.delay_prologue = null;

	this.Destroy = function() {

		this.display_manager = null;
		this.hud_manager = null;
		this.blink = false;

		this.keydown_enter = false;
		this.background = null;
		this.delay_blink = null;
		this.delay_prologue = null;
		
		return;
	}

	this.Create = function() {

		this.blink = false;

		this.display_manager = this.playable.display_manager;
		this.hud_manager = this.playable.hud_manager;

		this.keydown_enter = true;
		this.background = new Image();
		this.background.src = 'agartha/segment-000.png';

		this.delay_blink = new Delay(0, 50);
		this.delay_prologue = new Delay(0, 1000);

		$('#title').html("AGARTHA 2.4");
		jukebox.play("crestoe-sea-of-peril");

		return;
	}

	this.Draw = function() {

		FillRect(0, 0, 320, 240, "#000000");
		this.display_manager.logical_display.drawImage(this.background, 0, 0);

		return;
	}

	this.Process = function() {

		if (this.display_manager == null) {
			this.Create(); return; }

		this.Draw();
			
		if (this.delay_blink.Process() == false)
		{	if (this.blink == true) this.blink = false;
				else this.blink = true; }
		
		if (this.blink == true)
			FillRect(80, 170, 160, 10, "#000000");

		if (this.delay_prologue.Process() == false) {

			this.playable.current_level = 501;
			this.Destroy();
			return;
		}

		if ((this.hud_manager.keyboard.enter == true) &&
			(this.keydown_enter == false)) {

			this.keydown_enter = true;

			this.playable.current_level = 001;
			this.Destroy();
			return;
		}

		if ((this.hud_manager.keyboard.enter == false) &&
			(this.keydown_enter == true))
				this.keydown_enter = false;

		return;
	}
}

function _level501() {

	this.y = 0;
	this.playable = null;

	this.display_manager = null;
	this.hud_manager = null;

	this.keydown_enter = false;
	this.background = null;
	this.delay = null;

	this.Destroy = function() {

		this.y = 0;

		this.display_manager = null;
		this.hud_manager = null;

		this.keydown_enter = false;
		this.background = null;
		this.delay = null;

		return;
	}

	this.Create = function() {

		this.y = 240;

		this.display_manager = this.playable.display_manager;
		this.hud_manager = this.playable.hud_manager;

		this.keydown_enter = true;
		this.background = new Image();
		this.background.src = 'agartha/segment-001.png';
		this.delay = new Delay(0, 8);

		$('#title').html("PROLOGUE");
		return;
	}

	this.Process = function() {

		if (this.display_manager == null) {
			this.Create(); return; }
		if (this.delay.Process() == false) this.y--;

		FillRect(0, 0, 320, 240, "#000000");
		this.display_manager.logical_display.drawImage(
			this.background, 0, this.y);
		
		if ((this.hud_manager.keyboard.enter == true) &&
			(this.keydown_enter == false)) {

			this.keydown_enter = true;

			this.playable.current_level = 500;
			this.Destroy(); return;
		}

		if ((this.hud_manager.keyboard.enter == false) &&
			(this.keydown_enter == true))
				this.keydown_enter = false;

		if (this.y == -650) {

			this.playable.current_level = 500;
			this.Destroy(); return;
		}

		return;
	}
}

function _level502() {

	this.y = 0;
	this.playable = null;

	this.display_manager = null;
	this.hud_manager = null;

	this.keydown_enter = false;
	this.background = null;
	this.delay = null;

	this.Destroy = function() {

		this.y = 0;

		this.display_manager = null;
		this.hud_manager = null;

		this.keydown_enter = false;
		this.background = null;
		this.delay = null;

		return;
	}

	this.Create = function() {

		this.y = 240;

		this.display_manager = this.playable.display_manager;
		this.hud_manager = this.playable.hud_manager;

		this.keydown_enter = true;
		this.background = new Image();
		this.background.src = 'agartha/segment-002.png';
		this.delay = new Delay(0, 8);

		$('#title').html("EPILOGUE");
		return;
	}

	this.Process = function() {

		if (this.display_manager == null) {
			this.Create(); return; }
		if (this.delay.Process() == false) this.y--;

		FillRect(0, 0, 320, 240, "#000000");
		this.display_manager.logical_display.drawImage(
			this.background, 0, this.y);
		
		if ((this.hud_manager.keyboard.enter == true) &&
			(this.keydown_enter == false)) {

			this.keydown_enter = true;

			this.playable.current_level = 910;
			this.Destroy(); return;
		}

		if ((this.hud_manager.keyboard.enter == false) &&
			(this.keydown_enter == true))
				this.keydown_enter = false;

		if (this.y == -400) {

			this.playable.current_level = 910;
			this.Destroy(); return;
		}

		return;
	}
}

function _core_main() {

	this._state = new _core_state();

	this.playable = null;
	this.display_manager = null;
	this.viewport_manager = null;
	this.hud_manager = null;

	this.index = 0; this.handle = null;
	this.delay_restore = null;

	this.Create = function() {

		this.playable = new _playable_dolphin();
		this.playable.Dispatch();

		this.display_manager = this.playable.display_manager;
		this.hud_manager = this.playable.hud_manager;
		display = this.display_manager;
		
		this.LoadLevel();
		this.delay_restore = new Delay(0, 200);

		this.playable.health = 3;
		this.playable.breath = 3;
		this.playable.current_level = 910;

		return;
	}

	this.LoadLevel = function() {

		this.handle = new Array(7);

		this.handle[0] = new _level500();
		this.handle[0].playable = this.playable;
		this.handle[1] = new _level501();
		this.handle[1].playable = this.playable;
		this.handle[2] = new _level502();
		this.handle[2].playable = this.playable;

		this.handle[3] = new _level001();
		this.handle[3].playable = this.playable;

		this.handle[4] = new _level002();
		this.handle[4].playable = this.playable;

		this.handle[5] = new _level004();
		this.handle[5].playable = this.playable;

		this.handle[6] = new _level910();
		this.handle[6].playable = this.playable;

		return;
	}

	this.Process = function() {
	
		if (this.playable == null) { this.Create(); return; }
		if (display == null) return;

		if (this.playable.health == 0) this.RestorePlayable();
	
		switch (this.playable.current_level) {

			case 500: this.index = 0;
				break;
			case 501: this.index = 1;
				break;
			case 502: this.index = 2;
				break;

			case 001: this.index = 3;
				break;
			case 002: this.index = 4;
				break;
			case 004: this.index = 5;
				break;

			case 910: this.index = 6;
				break;
		}

		this.handle[this.index].Process();

		this.hud_manager.UpdateTargetHealth();
		this.hud_manager.UpdateMessage();
		this.display_manager.Draw();

		return;
	}

	this.RestorePlayable = function() {

		if (this.delay_restore.Process() == true)
			return;

		this.playable.Create();
		this.playable.SetState(this._state.Normal);

		this.playable.health = 3;
		this.playable.breath = 3;

		this.hud_manager.dialog = null;
		this.hud_manager.delay_dialog.count = 0;

		this.handle[this.index].SetState(this._state.Purge);
		return;
	}
}

var _main = new _core_main();
setInterval(function() { _main.Process(); }, 20);
