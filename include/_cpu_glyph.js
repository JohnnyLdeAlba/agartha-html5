
function _cpu_glyph_draw() {

	this.display_manager.drawImage(this.handle[0], this.x, this.y);
	return;
}

function _cpu_glyph_inbound(boundary) {

	if (InBound(this.current, boundary) == true)
		return true;
			
	return false;
}

function _cpu_glyph_drawhologram() {

	if (this.delay_blink.Process() == false)
		return

	this.display_manager.drawImage(this.handle[this.index], this.hologram_x, this.hologram_y);

	return;
}

function _cpu_glyph_inboundsonar(playable) {

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

		if (this.state == this._state.Hologram)
			return false;
		
		this.hud_manager.DispatchMessage(this.text);
		this.SetState(this._state.Hologram);
	}

	return true;
}

function _cpu_glyph_process() {

	if (this.state == this._state.Purge)
		return;


	if (this.InBound(this.viewport_manager.GetBoundary()) == false)
		return true;

	if (this.state == this._state.Hologram) {

		if (this.delay_hologram.Process() == false)
			this.SetState(this._state.Normal);

		this.DrawHologram();
	}

	this.InBoundSonar(this.playable);
	this.Draw();		
	return;
}

function _cpu_glyph_setdirection(direction) {

	this.direction = direction;

	switch (this.direction) {

		case this._direction.Left:
			this.index = 1;
			this.hologram_x = this.x-48;
			this.hologram_y = this.y;
				break;

		case this._direction.Right:
			this.index = 2;
			this.hologram_x = this.x+24;
			this.hologram_y = this.y;
				break;
	}

	return;
}

function _cpu_glyph_setid(id) {

	this.handle = new Array(3);
	this.handle[0] = new Image();
	this.handle[1] = new Image();
	this.handle[2] = new Image();

	switch (id) {

		case 'hercules': {
			this.handle[0].src = 'agartha/crystal-2.png';
			this.handle[1].src = 'agartha/hercules-left-1.png';
			this.handle[2].src = 'agartha/hercules-right-1.png';
			break; }

		default: {
			this.handle[0].src = 'agartha/crystal-1.png';
			this.handle[1].src = 'agartha/nalia-left-1.png';
			this.handle[2].src = 'agartha/nalia-right-1.png';
			break; }
	}

	return;
}

function _cpu_glyph_create() {

	this.display_manager = this.playable.display_manager;
	this.viewport_manager = this.playable.viewport_manager;
	this.hud_manager = this.playable.hud_manager;

	// constant:
	this.w = 10; this.h = 10;
	this.offset_x = 7; this.offset_y = 7;

	// initial:
	this.index = 0; this.hologram_x = 0;
	this.hologram_y = 0; this.text = null;

	this.SetPoint(0, 0);
		
	// assign:

	this.current = new Rectangle(0, 0, 0, 0);
	this.delay_blink = new Delay(0, 4);
	this.delay_hologram = new Delay(0, 400);

	this.SetState(this._state.Normal);
	return;
}

function _cpu_glyph_destroy() {

	this.state = this._state.Purge;	
	
	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;

	this.index = 0; this.hologram_x = 0;
	this.hologram_y = 0; this.offset_x = 0;
	this.offset_y = 0;

	this.current = null; this.delay_blink = null;
	this.delay_hologram = null; this.handle = null;
	this.text = null;

	return;
}

function _cpu_glyph() {

	this._consumable = new _core_consumable();
	this._direction = new _core_direction();
	this._state = new _core_state();

	this.playable = null;
	this.display_manager = null;
	this.viewport_manager = null;

	this.state = this._state.Purge;	
	
	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;

	this.index = 0; this.hologram_x = 0;
	this.hologram_y = 0; this.offset_x = 0;
	this.offset_y = 0;

	this.current = null; this.delay_blink = null;
	this.delay_hologram = null; this.handle = null;
	this.text = null;

	this.Create = _cpu_glyph_create;
	this.Destroy = _cpu_glyph_destroy;

	this.SetState = _core_method_setstate;
	this.set_playable = _core_method_setplayable;
	this.set_hudmanager = _core_method_sethudmanager;
	this.SetPoint = _core_method_setpoint;

	this.Draw = _cpu_glyph_draw;
	this.DrawHologram = _cpu_glyph_drawhologram;
	this.InBound = _cpu_glyph_inbound;
	this.InBoundSonar = _cpu_glyph_inboundsonar;
	this.Process = _cpu_glyph_process;
	this.SetDirection = _cpu_glyph_setdirection;
	this.SetId = _cpu_glyph_setid;
}

