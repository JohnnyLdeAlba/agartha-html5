
function _cpu_airplant_draw() {

	this.display_manager.drawImage(this.handle, this.x, this.y);
	return;
}

function _cpu_airplant_inboundplayable(playable) {

	if (this.bubble.InBoundPlayable(playable) == true)
		return true;

	return false;
}

function _cpu_airplant_inboundsonar(playable) {

	if (playable.state == this._state.Purge)
		return false;
	if (playable.state == this._state.Burst)
		return false;

	if (playable.projectile_sonar.state == this._state.Purge)
		return false;
	if (this.state == this._state.Purge)
		return false;

	this.current = new Rectangle(this.x+this.offset_x,
		this.y+this.offset_y, this.w, this.h);

	if (playable.projectile_sonar.InBound(this.current) == true) {

		playable.projectile_sonar.SetState(this._state.Purge);
		if (playable.breath >= 3) return false;

		if (this.bubble.state == this._state.Purge) {

			this.bubble.Create();
			this.bubble.SetPoint(this.x, this.y-12);
			this.SetState(this._state.Bubble);
		}

		return true;
	}

	return false;
}

function _cpu_airplant_inbound(boundary) {

	if (InBound(this.current, boundary) == true)
		return true;
			
	return false;
}

function _cpu_airplant_update() {

	if (this.state == this._state.Purge)
		return;
	if (this.state == this._state.Bubble)
		this.bubble.Update();

	if (this.InBound(this.viewport_manager.GetBoundary()) == false)
		return true;

	this.InBoundPlayable(this.playable);
	this.InBoundSonar(this.playable);

	this.Draw();		
	return;
}

function _cpu_airplant_setcolor(color) {

	this.handle = new Image();

	switch (color) {

		case 'orange': this.handle.src = 'agartha/airplant-2.png'; break;
		default:  this.handle.src = 'agartha/airplant-1.png'; break;
	}

	return;
}

function _cpu_airplant_create() {

	this.display_manager = this.playable.display_manager;
	this.viewport_manager = this.playable.viewport_manager;
	this.hud_manager = this.playable.hud_manager;

	// constant:
	this.w = 10; this.h = 10;
	this.offset_x = 7; this.offset_y = 7;

	// initial:
	this.index = 0; this.direction = 0;
	this.SetPoint(0, 0);
		
	// assign:
	this.bubble = new _projectile_bubble();
	this.bubble.playable = this.playable;
	this.bubble.LoadImage();

	this.current = new Rectangle(0, 0, 0, 0);

	this.SetState(this._state.Normal);
	return;
}

function _cpu_airplant_destroy() {

	this.state = this._state.Purge;	
	
	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;

	this.index = 0;
	this.offset_x = 0; this.offset_y = 0;

	this.bubble = null; this.current = null;
	this.handle = null;

	return;
}

function _cpu_airplant() {

	this._consumable = new _core_consumable();
	this._state = new _core_state();

	this.playable = null;
	this.display_manager = null;
	this.viewport_manager = null;
	this.hud_manager = null;

	this.state = this._state.Purge;	
	
	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;

	this.id = 0; this.index = 0;
	this.offset_x = 0; this.offset_y = 0;

	this.bubble = null; this.handle = null;

	this.set_playable = _core_method_setplayable;

	this.Create = _cpu_airplant_create;
	this.Destroy = _cpu_airplant_destroy;

	this.SetState = _core_method_setstate;
	this.SetPoint = _core_method_setpoint;
	this.SetColor = _cpu_airplant_setcolor;

	this.Draw = _cpu_airplant_draw;
	this.InBound = _cpu_airplant_inbound;
	this.InBoundPlayable = _cpu_airplant_inboundplayable;
	this.InBoundSonar = _cpu_airplant_inboundsonar;
	this.Update = _cpu_airplant_update;
}

