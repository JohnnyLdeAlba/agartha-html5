
function _cpu_fish_draw() {

	this.display_manager.drawImage(this.handle[this.index], this.x, this.y);
	return;
}

function _cpu_fish_inboundplayable(playable) {

	if (playable.state == playable._state.Purge)
		return true;
	if (playable.state == playable._state.Burst)
		return true;
	if (playable.health >= 6)
		return true;

	if (this.state == this._state.Purge)
		return true;

	if (playable.InBound(this.current) == true) {

		playable.health++;

		this.burst.Create();
		this.burst.Create(); this.burst.SetPoint(this.x, this.y);

		this.current.setRectangle(0, 0, 0, 0);
		this.SetState(this._state.Burst);

		return true;
	}

	return false;
}

function _cpu_fish_setdirection(direction) {

	this.direction = direction;

	switch (this.direction) {

		case this._direction.Left:
			this.index = 0; break;

		case this._direction.Right:
			this.index = 1; break;
	}

	return;
}

function _cpu_fish_inbound(boundary) {

	if (InBound(this.current, boundary) == true)
		return true;
			
	return false;
}

function _cpu_fish_setboundarywidth(w) {

	this.boundary = new Rectangle(this.x, this.y, w, 0);
	return;
}

function _cpu_fish_setspecies(species) {

	this.handle = new Array(2);
	this.handle[0] = new Image();
	this.handle[1] = new Image();

	switch (species) {

		case 'risingsun':
			this.handle[0].src = 'agartha/fish-3-left.png';
			this.handle[1].src = 'agartha/fish-3-right.png';
			break;

		case 'stripes':
			this.handle[0].src = 'agartha/fish-2-left.png';
			this.handle[1].src = 'agartha/fish-2-right.png';
			break;

		default:
			this.handle[0].src = 'agartha/fish-1-left.png';
			this.handle[1].src = 'agartha/fish-1-right.png';
			break;
	}

	return;
}

function _cpu_fish_update() {

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

	if (this.InBound(this.viewport_manager.GetBoundary()) == false)
		return true;

	if (this.x+this.offset_x+this.w > this.boundary.x+this.boundary.w)
		this.SetDirection(this._direction.Left);
	else if (this.x+this.offset_x < this.boundary.x)
		this.SetDirection(this._direction.Right);

	this.current = new Rectangle(this.x+this.offset_x,
		this.y+this.offset_y, this.w, this.h);

	if (this.delay_move.Process() == false) {

		if (this.direction == this._direction.Left)
			this.x--;
		else if (this.direction == this._direction.Right)
				this.x++;
	}

	this.InBoundPlayable(this.playable);
	this.Draw();		
	return;
}

function _cpu_fish_create() {

	this.display_manager = this.playable.display_manager;
	this.viewport_manager = this.playable.viewport_manager;
	this.hud_manager = this.playable.hud_manager;

	// constant:
	this.w = 10; this.h = 10;
	this.offset_x = 7; this.offset_y = 7;

	// initial:
	this.index = 0;
	this.SetPoint(0, 0);
		
	// assign:
	this.burst = new _projectile_burst();
	this.burst.LoadImage();

	this.boundary = new Rectangle(0, 0, 0, 0);
	this.current = new Rectangle(0, 0, 0, 0);
	this.delay_move = new Delay(0, 4);

	this.SetState(this._state.Normal);
	return;
}

function _cpu_fish_destroy() {

	this.state = this._state.Purge;	
	
	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;

	this.index = 0; this.offset_x = 0;
	this.offset_y = 0;

	this.boundary = null; this.burst = null;
	this.current = null; this.delay_move = null;

	return;
}

function _cpu_fish() {

	this._consumable = new _core_consumable();

	this._state = new _core_state();
	this._direction = new _core_direction();

	this.playable = null;
	this.display_manager = null;
	this.viewport_manager = null;
	this.hud_manager = null;

	this.state = this._state.Purge;	

	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;

	this.index = 0; this.direction = 0;
	this.offset_x = 0; this.offset_y = 0;

	this.burst = null; this.current = null;
	this.delay_move = null; this.handle = null;

	this.Create = _cpu_fish_create;
	this.Destroy = _cpu_fish_destroy;

	this.SetState = _core_method_setstate;
	this.SetPoint = _core_method_setpoint;

	this.Draw = _cpu_fish_draw;
	this.InBound = _cpu_fish_inbound;
	this.InBoundPlayable = _cpu_fish_inboundplayable;
	this.SetBoundaryWidth = _cpu_fish_setboundarywidth;
	this.SetDirection = _cpu_fish_setdirection;
	this.SetSpecies = _cpu_fish_setspecies;
	this.Update = _cpu_fish_update;
}

