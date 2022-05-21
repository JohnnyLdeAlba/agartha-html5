
function _projectile_bubble_draw() {

	if (this.delay_blink.Process() == false)
		return

	this.display_manager.drawImage(this.handle[this.index], this.x, this.y);

	return;
}

function _projectile_bubble_inbound(boundry) {

	if (InBound(this.current, boundry) == true)
		return true;
			
	return false;
}

function _projectile_bubble_inboundplayable(playable) {

	if (playable.state == playable._state.Purge)
		return false;
	if (playable.state == playable._state.Burst)
		return false;

	if (playable.breath >= 3)
		return false;

	if (this.state == this._state.Purge)
		return false;
	if (this.state == this._state.Burst)
		return false;

	if (playable.InBound(this.current) == true) {

		playable.breath++;
		this.burst.Create();
		this.burst.Create(); this.burst.SetPoint(this.x, this.y);

		this.SetState(this._state.Burst);
		return true;
	}

	return false;
}

function _projectile_bubble_loadimage() {

	this.handle = new Array(2);
	this.handle[0] = new Image();
	this.handle[0].src = 'agartha/airbubble-1.png';

	this.handle[1] = new Image();
	this.handle[1].src = 'agartha/airbubble-2.png';

	return;
}

function _projectile_bubble_update() {

	if (this.state == this._state.Purge)
		return;
	if (this.state == this._state.Burst) {

		if (this.burst.state == this.burst._state.Purge) {

			this.SetState(this._state.Purge);
			return;
		}
		
		this.burst.Process();
		return;
	}

	this.current = new Rectangle(this.x+this.offset_x,
		this.y+this.offset_y, this.w, this.h);

	if (InBound(this.current, new Rectangle(this.viewport_manager.x, this.viewport_manager.y,
		this.viewport_manager.w, this.viewport_manager.h)) == false) {

		this.SetState(this._state.Purge);
		return;
	}

	if (this.delay_flip.Process() == false) {
		if (this.index == 1) this.index = 0;
			else this.index = 1;
		this.y--;
	}

	this.Draw();		
	return;
}

function _projectile_bubble_create() {

	this.display_manager = this.playable.display_manager;
	this.viewport_manager = this.playable.viewport_manager;

	// constant:
	this.w = 10; this.h = 10;
	this.offset_x = 7; this.offset_y = 7;

	// initial:
	this.index = 0;
	this.SetPoint(0, 0);
		
	// assign:
	this.burst = new _projectile_burst();
	this.burst.LoadImage();

	this.current = new Rectangle(0, 0, 0, 0);
	this.delay_blink = new Delay(0, 4);
	this.delay_flip = new Delay(0, 8);

	this.SetState(this._state.Normal);
	return;
}

function _projectile_bubble_destroy() {

	this.state = this._state.Purge;	
	
	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;

	this.id = 0; this.index = 0;
	this.offset_x = 0; this.offset_y = 0;

	this.burst = null; this.current = null;
	this.delay_blink = null; this.delay_flip = null;

	return;
}

function _projectile_bubble() {

	this._consumable = new _core_consumable();
	this._state = new _core_state();

	this.playable = null;
	this.display_manager = null;
	this.viewport_manager = null;

	this.state = this._state.Purge;	
	
	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;

	this.id = 0; this.index = 0;
	this.offset_x = 0; this.offset_y = 0;

	this.burst = null; this.current = null;
	this.delay_blink = null; this.delay_flip = null;
	this.handle = null;

	this.Create = _projectile_bubble_create;
	this.Destroy = _projectile_bubble_destroy;

	this.SetState = _core_method_setstate;
	this.SetPoint = _core_method_setpoint;

	this.Draw = _projectile_bubble_draw;
	this.InBound = _projectile_bubble_inbound;
	this.InBoundPlayable = _projectile_bubble_inboundplayable;
	this.LoadImage = _projectile_bubble_loadimage;
	this.Update = _projectile_bubble_update;
}

