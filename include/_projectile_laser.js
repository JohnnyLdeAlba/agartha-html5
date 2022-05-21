
function _projectile_laser_draw() {

	if (this.delay_flip.Process() == false)
		return;
	
	this.display_manager.drawImage(this.handle[this.index], this.x, this.y);
	return;
}

function _projectile_laser_process() {

	if (this.state == this._state.Purge)
		return;

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

function _projectile_laser_setdirection(direction) {

	this.direction = direction;

	switch (this.direction) {

		case this._direction.Left:
			this.index = 0; break;
		case this._direction.Right:
			this.index = 1; break;

		case this._direction.Up:
			this.index = 2; break;
		case this._direction.Down:
			this.index = 3; break;
	}

	return;
}

function _projectile_laser_inbound(boundry) {

	if (InBound(this.current, boundry) == true)
		return true;
			
	return false;
}

function _projectile_laser_loadimage() {

	var count = 0; var total = 8; 

	this.handle = new Array(total);
	for (; count < total; count++)
		this.handle[count] = new Image();

	count = 0;
	this.handle[count].src = 'agartha/lazer-left-1.png';
	this.handle[++count].src = 'agartha/lazer-right-1.png';
	this.handle[++count].src = 'agartha/lazer-up-1.png';
	this.handle[++count].src = 'agartha/lazer-down-1.png';

	return;
}

function _projectile_laser_loadimageredlaser() {

	var count = 0; var total = 8; 

	this.handle = new Array(total);
	for (; count < total; count++)
		this.handle[count] = new Image();

	count = 0;
	this.handle[count].src = 'agartha/lazerred-left-1.png';
	this.handle[++count].src = 'agartha/lazerred-right-1.png';
	this.handle[++count].src = 'agartha/lazer-up-1.png';
	this.handle[++count].src = 'agartha/lazer-down-1.png';

	return;
}

function _projectile_laser_create() {

	this.display_manager = this.playable.display_manager;
	this.viewport_manager = this.playable.viewport_manager;

	// constant:
	this.w = 10; this.h = 10;
	this.offset_x = 20; this.offset_y = 20;
	this.velocity = 8;

	// initial:
	this.SetPoint(0, 0);
	this.current = new Rectangle(0, 0, 10, 10);
		
	// assign:
	this.SetState(this._state.Normal);
	this.SetDirection(this._direction.Left);

	this.delay_flip = new Delay(0, 2);
	

	return;
}

function _projectile_laser_destroy() {

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

function _projectile_laser() {

	this._state = new function() {

		this.Purge = 0;
		this.Normal = 1;
	}

	this._direction = new _core_direction();

	this.playable = null;
	this.display_manager = null;
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

	this.Create = _projectile_laser_create;
	this.Destroy = _projectile_laser_destroy;

	this.InBound = _projectile_laser_inbound;
	this.SetDirection = _projectile_laser_setdirection;
	this.LoadImage = _projectile_laser_loadimage;
	this.LoadImageRedLaser = _projectile_laser_loadimageredlaser;

	this.Process = _projectile_laser_process;
	this.Draw = _projectile_laser_draw;
}

