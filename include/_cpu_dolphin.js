
function _cpu_darkorca_loadimage() {

	var count = 0; var total = 18;

	this.handle = new Array(total);
	for (; count < total; count++)
		this.handle[count] = new Image();

	count = 0;
	this.handle[count].src = 'agartha/darkorca-left-1.png';
	this.handle[++count].src = 'agartha/darkorca-left-2.png';
	this.handle[++count].src = 'agartha/darkorca-left-3.png';
	this.handle[++count].src = 'agartha/darkorca-left-4.png';
	this.handle[++count].src = 'agartha/darkorca-left-5.png';

	this.handle[++count].src = 'agartha/darkorca-right-1.png'; 
	this.handle[++count].src = 'agartha/darkorca-right-2.png';
	this.handle[++count].src = 'agartha/darkorca-right-3.png';
	this.handle[++count].src = 'agartha/darkorca-right-4.png';
	this.handle[++count].src = 'agartha/darkorca-right-5.png';

	this.handle[++count].src = 'agartha/darkorca-up-4.png';
	this.handle[++count].src = 'agartha/darkorca-up-2.png';
	this.handle[++count].src = 'agartha/darkorca-up-3.png';
	this.handle[++count].src = 'agartha/darkorca-up-4.png';

	this.handle[++count].src = 'agartha/darkorca-down-4.png';
	this.handle[++count].src = 'agartha/darkorca-down-2.png';
	this.handle[++count].src = 'agartha/darkorca-down-3.png';
	this.handle[++count].src = 'agartha/darkorca-down-4.png';

	return;
}

function _cpu_darkorca_create() {

	this._cpu_darkorca_loadimage();
	this.Create();

	return;
}

function _cpu_orca_loadimage() {

	var count = 0; var total = 18;

	this.handle = new Array(total);
	for (; count < total; count++)
		this.handle[count] = new Image();

	count = 0;
	this.handle[count].src = 'agartha/orca-left-1.png';
	this.handle[++count].src = 'agartha/orca-left-2.png';
	this.handle[++count].src = 'agartha/orca-left-3.png';
	this.handle[++count].src = 'agartha/orca-left-4.png';
	this.handle[++count].src = 'agartha/orca-left-5.png';

	this.handle[++count].src = 'agartha/orca-right-1.png'; 
	this.handle[++count].src = 'agartha/orca-right-2.png';
	this.handle[++count].src = 'agartha/orca-right-3.png';
	this.handle[++count].src = 'agartha/orca-right-4.png';
	this.handle[++count].src = 'agartha/orca-right-5.png';

	this.handle[++count].src = 'agartha/orca-up-4.png';
	this.handle[++count].src = 'agartha/orca-up-2.png';
	this.handle[++count].src = 'agartha/orca-up-3.png';
	this.handle[++count].src = 'agartha/orca-up-4.png';

	this.handle[++count].src = 'agartha/orca-down-4.png';
	this.handle[++count].src = 'agartha/orca-down-2.png';
	this.handle[++count].src = 'agartha/orca-down-3.png';
	this.handle[++count].src = 'agartha/orca-down-4.png';

	return;
}

function _cpu_orca_create() {

	this._cpu_orca_loadimage();
	this.Create();

	return;
}

function _cpu_dolphin_inboundspeak(playable) {

	if (playable.state == playable._state.Purge)
		return false;
	if (playable.state == playable._state.Burst)
		return false;

	if (playable.projectile_sonar.state == playable.projectile_sonar._state.Purge)
		return false;

	if (this.state == this._state.Purge)
		return false;

	this.current = new Rectangle(this.x+this.offset_x,
		this.y+this.offset_y, this.w, this.h);

	if (playable.projectile_sonar.InBound(this.current) == true) {

		playable.projectile_sonar.SetState(playable.projectile_sonar._state.Purge);
		this.hud_manager.DispatchMessage(this.text);
		this.SetState(this._state.Hologram);
	}

	return true;
}

function _cpu_dolphin_inbound(boundry) {

	if (InBound(this.current, boundry) == true)
		return true;
			
	return false;
}

function _cpu_dolphin_setdirection(direction) {

	if (this.direction == direction)
		return;

	this.direction = direction;
	this.SetStartFrame(this.direction);
	return;
}

function _cpu_dolphin_setdefaultframe(direction) {

	switch (this.direction) {

		case this._direction.Left:
			this.index = 0; break;

		case this._direction.Right:
			this.index = 5; break;

		case this._direction.Up:
			this.index = 10; break;

		case this._direction.Down:
			this.index = 14; break;
	}

	return;
}

function _cpu_dolphin_setstartframe(direction) {

	switch (this.direction) {

		case this._direction.Left:
			this.index = 1; break;

		case this._direction.Right:
			this.index = 6; break;

		case this._direction.Up:
			this.index = 11; break;

		case this._direction.Down:
			this.index = 15; break;
	}

	return;
}

function _cpu_dolphin_loadimage() {

	var count = 0; var total = 18;

	this.handle = new Array(total);
	for (; count < total; count++)
		this.handle[count] = new Image();

	count = 0;
	this.handle[count].src = 'agartha/dolphin-left-1.png';
	this.handle[++count].src = 'agartha/dolphin-left-2.png';
	this.handle[++count].src = 'agartha/dolphin-left-3.png';
	this.handle[++count].src = 'agartha/dolphin-left-4.png';
	this.handle[++count].src = 'agartha/dolphin-left-5.png';

	this.handle[++count].src = 'agartha/dolphin-right-1.png'; 
	this.handle[++count].src = 'agartha/dolphin-right-2.png';
	this.handle[++count].src = 'agartha/dolphin-right-3.png';
	this.handle[++count].src = 'agartha/dolphin-right-4.png';
	this.handle[++count].src = 'agartha/dolphin-right-5.png';

	this.handle[++count].src = 'agartha/dolphin-up-1.png';
	this.handle[++count].src = 'agartha/dolphin-up-2.png';
	this.handle[++count].src = 'agartha/dolphin-up-3.png';
	this.handle[++count].src = 'agartha/dolphin-up-4.png';

	this.handle[++count].src = 'agartha/dolphin-down-1.png';
	this.handle[++count].src = 'agartha/dolphin-down-2.png';
	this.handle[++count].src = 'agartha/dolphin-down-3.png';
	this.handle[++count].src = 'agartha/dolphin-down-4.png';

	return;
}

function _cpu_dolphin_frameset(start, stop) {

	if ((this.index < start) || (this.index > stop))
		this.index = start;
	else this.index++;

	return;
}

function _cpu_dolphin_updateframe() {

	if (this.delay_flip.Process() == true)
		return false;

	switch (this.direction) {
				
		case this._direction.Left:
			this.FrameSet(1, 3);
			break;

		case this._direction.Right: 
			this.FrameSet(6, 8);
 			break;

		case this._direction.Up:
			this.FrameSet(11, 12);
			break;

		case this._direction.Down:
			this.FrameSet(15, 16);
			break;
	}

	return;
}

function _cpu_dolphin_draw() {

	if (this.state == this._state.Damage)
		if (this.delay_flip.Process() == true) return;

	display.drawImage(this.handle[this.index],
		this.x, this.y);

	return;
}

function _cpu_dolphin_sethealth(health) {

	if (this._core_method_sethealth(health) == false) {
		this.next.setRectangle(0, 0, 0, 0);
		return false;
	}

	return true;
}

function _cpu_dolphin_updatehunt() {

	if (this.flag_hostile == false) return false;

	if (this.playable.state == this.playable._state.Purge)
		return false;
	if (this.playable.state == this.playable._state.Burst)
		return false;

	if (this.delay_hunt.Process() == false)
		this.SetState(this._state.Hunt);

	if (not_equal(this.state, this._state.Hunt))
		return false;

	if (this.y < this.playable.y)
		this.SetDirection(this._direction.Down);

	else if (this.y > this.playable.y)
		this.SetDirection(this._direction.Up);

	if (this.x < this.playable.x)
		this.SetDirection(this._direction.Right);

	else if (this.x > this.playable.x)
		this.SetDirection(this._direction.Left);

	if (this.delay_move.Process() == true)
		return;

	if (this.x > this.playable.x) this.x--;
		else if (this.x < this.playable.x) this.x++;

	if (this.y > this.playable.y) this.y--;
		else if (this.y < this.playable.y) this.y++;

	if (this.playable.InBound(this.current) == true)
		this.SetState(this._state.Normal);

	return true;
}

function _cpu_dolphin_updatepoint() {

	if (this.next == null) {
		this.SetDefaultFrame(this.direction);
		return;
	}

	if (this.InBound(this.next[this.next_point]) == true) {

		this.next_point++;
		if (this.next_point >= this.next.length)
			this.next_point = 0;
	}

	if (this.x < this.next[this.next_point].x)
		this.SetDirection(this._direction.Right);

	else if (this.x > this.next[this.next_point].x)
		this.SetDirection(this._direction.Left);

	if (this.y < this.next[this.next_point].y)
		this.SetDirection(this._direction.Down);

	else if (this.y > this.next[this.next_point].y)
		this.SetDirection(this._direction.Up);

	if (this.delay_move.Process() == true)
		return;

	if (this.x > this.next[this.next_point].x) this.x--;
		else if (this.x < this.next[this.next_point].x) this.x++;

	if (this.y > this.next[this.next_point].y) this.y--;
		else if (this.y < this.next[this.next_point].y) this.y++;

	return;
}

function _cpu_dolphin_processstate() {

	switch (this.state) {

		case this._state.Purge:
			return true;

		case this._state.Burst:
				
			if (this.projectile_burst.state == this.projectile_burst._state.Purge) {
				this.SetState(this._state.Purge);
				return true; }

			this.projectile_burst.Process();
			return true;

		case this._state.Damage:

			if (this.delay_damage.Process() == false)
				this.SetState(this._state.Normal);
			break;
	}
}

function _cpu_dolphin_process() {

	if (this.ProcessState() == true)
			return;

	if (this.InBound(this.viewport_manager.GetBoundary()) == false)
		return true;

	this.UpdateFrame();
	if (this.UpdateHunt() == false)
		this.UpdatePoint();

	this.current = new Rectangle(this.x+this.offset_x,
		this.y+this.offset_y, this.w, this.h);

	if (this.flag_hostile == true)
		this.playable.InBoundTarget(this);
	else this.InBoundSpeak(this.playable);

	this.Draw();
	return;
}

function _cpu_dolphin_create() {

	this.display_manager = this.playable.display_manager;
	this.viewport_manager = this.playable.viewport_manager;
	this.hud_manager = this.playable.hud_manager;

	this.id = new Date().getTime();
	this.SetPoint(0, 0);
	this.w = 12; this.h = 12; this.image_w = 48;
	this.offset_x = 18; this.offset_y = 18;
	this.flag_hostile = false;

	this.index = 0;
	this.current = new Rectangle(0, 0, 0, 0);
	this.next = null; this.next_point = 0;
	this.health = 10;
	this.delay_flip = new Delay(0, 8);
	this.delay_move = new Delay(0, 2);
	this.delay_damage = new Delay(0, 30);
	this.delay_hunt = new Delay(0, 400);
	this.text = '';

	if (this.handle == null) this.LoadImage();

	this.projectile_burst = new _projectile_burst();
	this.projectile_burst.LoadImage();

	this.SetState(this._state.Normal);
	this.SetDirection(this._direction.Left);

	return;
} 

function _cpu_dolphin_destroy() {

	this.state = this._state.Purge;
	this.direction = this._direction.Left;
	this.flag_hostile = false;

	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;
	this.image_w = 0;
	this.health = 0;
	this.current = null; this.next = null;
	this.next_point = 0;
	this.offset_x = 0; this.offset_y = 0;

	this.index = 0;
	this.handle = null;
	this.delay_flip = null;
	this.delay_move = null;
	this.text = null;
	
	return;
}

function _cpu_dolphin() {

	this._core_method_sethealth = _core_method_sethealth;

	this._cpu_darkorca_loadimage = _cpu_darkorca_loadimage;
	this._cpu_darkorca_create = _cpu_darkorca_create;
	this._cpu_orca_loadimage = _cpu_orca_loadimage;
	this._cpu_orca_create = _cpu_orca_create;

	this.playable = null;
	this.display_manager = null;
	this.viewport_manager = null;
	this.hud_manager = null;

	this._state = new _core_state();
	this._direction = new _core_direction();
	this._consumable = new _core_consumable();
	this.flag_hostile = false;

	this.playable = null;
	this.hud_manager = null;

	this.state = this._state.Purge;
	this.direction = this._direction.Left;

	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;
	this.image_w = 0;

	this.current = null; this.next = null;
	this.next_point = 0;
	this.offset_x = 0; this.offset_y = 0;

	this.index = 0;
	this.handle = null;
	this.delay_flip = null;
	this.delay_move = null;
	this.text = null;

	this.set_playable = _core_method_setplayable;
	this.set_hudmanager = _core_method_sethudmanager;

	this.SetState = _core_method_setstate;
	this.SetPoint = _core_method_setpoint;
	this.SetHealth = _core_method_sethealth;

	this.Create = _cpu_dolphin_create;
	this.Destroy = _cpu_dolphin_destroy;

	this.InBound = _cpu_dolphin_inbound;
	this.InBoundSpeak = _cpu_dolphin_inboundspeak;

	this.SetDirection = _cpu_dolphin_setdirection;
	this.LoadImage = _cpu_dolphin_loadimage;
	this.SetDefaultFrame = _cpu_dolphin_setstartframe;
	this.SetStartFrame = _cpu_dolphin_setstartframe;
	this.FrameSet = _cpu_dolphin_frameset;
	this.UpdateFrame = _cpu_dolphin_updateframe;
	this.Draw = _cpu_dolphin_draw;

	this.UpdateHunt = _cpu_dolphin_updatehunt;
	this.UpdatePoint = _cpu_dolphin_updatepoint;
	
	this.ProcessState = _cpu_dolphin_processstate;
	this.Process = _cpu_dolphin_process;
}
