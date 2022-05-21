
function _projectile_sprite() {

	this._state = new _core_state();
	this._direction = new _core_direction();
	this.state = this._state.Purge;

	this.display_manager = null;
	this.viewport_manager = null;

	this.x = 0; this.y = 0;
	this.velocity = 0; this.current = null;
	this.target = null;

	this.SetState = _core_method_setstate;
	this.SetPoint = _core_method_setpoint;
	this.InBound = _core_method_inbound;

	this.Create = function() {

		this.display_manager = this.playable.display_manager;
		this.viewport_manager = this.playable.viewport_manager;

		this.target = null;
		this.x = 0; this.y = 0;
		this.w = 0; this.h = 0;
		this.offset_x = 0; this.offset_y = 0;
		this.velocity = 4;

		this.current = new Rectangle(0, 0, 0, 0);
		this.SetState(this._state.Normal);

		return;	
	}

	this.Destroy = function() {

		this.display_manager = null;

		this.x = 0; this.y = 0;
		this.velocity = 0; this.current = null;
		this.target = null;
		return;
	}

	this.Process = function() {
	
		if (this.state == this._state.Purge) return;
		if (this.target == null) return;

		if (this.target.state == this._state.Purge) {
			this.SetState(this._state.Purge); return; }
		if (this.target.state == this._state.Burst) {
			this.SetState(this._state.Purge); return; }

		if (this.x < this.target.current.x) this.x+= this.velocity;
		else if (this.x > this.target.current.x) this.x-= this.velocity;

		if (this.y < this.target.current.y) this.y+= this.velocity;
		else if (this.y > this.target.current.y) this.y-= this.velocity;

		this.current.setRectangle(this.x, this.y, 5, 5);

		if (InBound(this.current, new Rectangle(this.viewport_manager.x, this.viewport_manager.y,
			this.viewport_manager.w, this.viewport_manager.h)) == false) {

			this.SetState(this._state.Purge);
			return;
		}

		this.display_manager.FillRect(this.x, this.y, 4, 4, '#ffff00');
		return;
	}
}

function _projectile_sonar_draw() {

	display.drawImage(this.handle[this.index], this.x, this.y);
	return;
}

function _projectile_sonar_process() {

	if (this.state == this._state.Purge)
		return;
	if (this.state == this._state.Normal)
		this.UpdateFrame();

	switch (this.direction) {

		case this._direction.Left:
			this.x-= this.velocity; break;
		case this._direction.Right:
			this.x+= this.velocity; break;
		case this._direction.Up:
			this.y-= this.velocity; break;
		case this._direction.Down:
			this.y+= this.velocity; break;
	}

	this.current.setRectangle(this.x+this.offset_x, this.y+this.offset_y,
		this.w, this.h);

	if (InBound(this.current, new Rectangle(this.viewport_manager.x, this.viewport_manager.y,
		this.viewport_manager.w, this.viewport_manager.h)) == false) {

		this.SetState(this._state.Purge);
		return;
	}

	this.Draw();		
	return;
}

function _projectile_sonar_updateframe() {

	if (this.delay_flip.Process() == false) {

		this.index++;
		this.SetState(this._state.Wave);

		return;
	}

	return;
}

function _projectile_sonar_setdirection(direction) {

	this.direction = direction;

	switch (this.direction) {

		case this._direction.Left:
			this.index = 0; break;
		case this._direction.Right:
			this.index = 2; break;

		case this._direction.Up:
			this.index = 4; break;
		case this._direction.Down:
			this.index = 6; break;
	}

	return;
}

function _projectile_sonar_inbound(boundry) {

	if (InBound(this.current, boundry) == true)
		return true;
			
	return false;
}

function _projectile_sonar_loadimage() {

	var count = 0; var total = 8; 

	this.handle = new Array(total);
	for (; count < total; count++)
		this.handle[count] = new Image();

	count = 0;
	this.handle[count].src = 'agartha/sonar-left-1.png';
	this.handle[++count].src = 'agartha/sonar-left-2.png';
	this.handle[++count].src = 'agartha/sonar-right-1.png';
	this.handle[++count].src = 'agartha/sonar-right-2.png';

	this.handle[++count].src = 'agartha/sonar-up-1.png';
	this.handle[++count].src = 'agartha/sonar-up-2.png';
	this.handle[++count].src = 'agartha/sonar-down-1.png';
	this.handle[++count].src = 'agartha/sonar-down-2.png';

	return;
}

function _projectile_sonar_create() {

	this.viewport_manager = this.playable.viewport_manager;

	// constant:

	this.w = 10; this.h = 10;
	this.offset_x = 6; this.offset_y = 6;
	this.velocity = 5;

	// initial:

	this.SetPoint(0, 0);
	this.current = new Rectangle(0, 0, 10, 10);
		
	// assign:

	this.SetState(this._state.Normal);
	this.SetDirection(this._direction.Left);

	this.delay_flip = new Delay(0, 8);

	return;
}

function _projectile_sonar_destroy() {

	this.state = this._state.Purge;
	this.direction = 0; this.index = 0;	

	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;
	this.offset_x = 0; this.offset_y = 0;
	this.velocity = 0;

	this.current = null;
	this.delay_flip = null;

	return;
}

function _projectile_sonar() {

	this._state = new function() {

		this.Purge = 0;
		this.Normal = 1;
		this.Wave = 2;
	}

	this._direction = new _core_direction();

	this.playable = null;
	this.viewport_manager = null;

	this.state = this._state.Purge;
	this.direction = 0; this.index = 0;	

	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;
	this.offset_x = 0; this.offset_y = 0;
	this.velocity = 0;

	this.current = null; this.handle = null;
	this.delay_flip = null;

	this.SetState = _core_method_setstate;
	this.SetPoint = _core_method_setpoint;

	this.Create = _projectile_sonar_create;
	this.Destroy = _projectile_sonar_destroy;

	this.InBound = _projectile_sonar_inbound;
	this.SetDirection = _projectile_sonar_setdirection;
	this.LoadImage = _projectile_sonar_loadimage;
	this.UpdateFrame = _projectile_sonar_updateframe;

	this.Process = _projectile_sonar_process;
	this.Draw = _projectile_sonar_draw;
}

