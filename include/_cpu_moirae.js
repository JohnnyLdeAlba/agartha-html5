
function _cpu_moirae_inbound(boundary) {

	if (InBound(this.current, boundary) == true)
		return true;
			
	return false;
}

function _cpu_moirae_createlaser() {

	if (this.playable.state == this.playable._state.Purge)
		return false;
	if (this.playable.state == this.playable._state.Burst)
		return false;

	if (this.projectile_laser.state != this.projectile_laser._state.Purge)
		return;

	this.projectile_laser.Create();
	this.projectile_laser.SetDirection(this.direction);

	switch (this.projectile_laser.direction) {
				
		case this._direction.Left:

			this.projectile_laser.SetPoint(this.x-(this.image_w/2), this.y);
			break;

		case this._direction.Right: 

			this.projectile_laser.SetPoint(this.x+(this.image_w/2), this.y);
 			break;
	}

	if (this.direction == this._direction.Left) {
		if (this.left_jab == true) this.index = 2;
		else this.index = 3;
	}
	else {
		if (this.left_jab == true) this.index = 6;
		else this.index = 7;
	}

	if (this.left_jab == true) this.left_jab = false;
		else this.left_jab = true;

	this.SetState(this._state.Laser);

	return;
}

function _cpu_moirae_updatepoint() {

	if (this.playable.state == this._state.Purge)
		return false;
	if (this.playable.state == this._state.Burst)
		return false;

	if (this.state == this._state.Laser)
		return false;

	if (this.delay_flip.Process() == false) {

		if (this.x < this.playable.x)
			this.SetDirection(this._direction.Right);
		else if (this.x > this.playable.x)
			this.SetDirection(this._direction.Left);
	}

	if (not_equal(this.restricted_boundary, null) == true)
	if (this.playable.InBound(this.restricted_boundary) == false)
		return false;

	if (this.delay_move.Process() == true)
		return true;

	if (this.direction == this._direction.Left) this.x-= 2;
		else if (this.direction == this._direction.Right) this.x+= 2;

	if (this.y < this.playable.y) this.y++;
		else if (this.y > this.playable.y) this.y--;

	return true;
}

function _cpu_moirae() {

	this._state = new _core_state();
	this._direction = new _core_direction();

	this.playable = null;
	this.display_manager = null;
	this.viewport_manager = null;
	this.hud_manager = null;

	this.SetState = _core_method_setstate;
	this.SetPoint = _core_method_setpoint;
	this.SetHealth = _core_method_sethealth;

	this.InBound = _core_method_inbound;
	this.state = this._state.Purge;
	
	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;

	this.direction = 0;
	this.health = 0; this.full_health = 0;
	this.index = 0; this.image_w = 0;
	this.offset_x = 0; this.offset_y = 0;

	this.boundary = null; this.projectile_burst = null;
	this.current = null; this.handle = null;
	this.restricted_boundary = null;
	this.projectile_laser = null; this.left_jab = false;
	
	this.delay_flip = null; this.delay_move = null;
	this.delay_damage = null;

	this.InBoundPlayableLaser = _core_method_inboundplayablelaser;

	this.CreateLaser = _cpu_moirae_createlaser;
	this.UpdatePoint = _cpu_moirae_updatepoint;

	this.Create = function() {

		this.display_manager = this.playable.display_manager;
		this.viewport_manager = this.playable.viewport_manager;
		this.hud_manager = this.playable.hud_manager;

		this.id = new Date().getTime();
		// constant

		this.w = 32; this.h = 12; this.image_w = 48;
		this.offset_x = 8; this.offset_y = 18;

		// initial

		this.x = 0; this.y = 0; this.index = 0;
		this.current = new Rectangle(0, 0, 0, 0);
		this.boundary = new Rectangle(0, 0, 0, 0);
		this.restricted_boundary = null;
		this.left_jab = true;
		// assign

		this.SetState(this._state.Normal);
		this.SetDirection(this._direction.Right);

		this.health = 12; this.full_health = 12;
		this.projectile_burst = new _projectile_burst();
		this.projectile_burst.LoadImage();

		this.projectile_laser = new _projectile_laser();
		this.projectile_laser.playable = this.playable;
		this.projectile_laser.LoadImageRedLaser();

		this.delay_flip = new Delay(0, 40);
		this.delay_move = new Delay(0, 1);
		this.delay_damage = new Delay(0, 30);
		this.delay_createlaser = new Delay(0, 200);
		this.delay_waitlaser = new Delay(0, 10);

		if (this.handle == null) this.LoadImage();
		return;
	}

	this.LoadImage = function() {

		var count = 0; var total = 8;

		this.handle = new Array(total);
		for (; count < total; count++) this.handle[count] = new Image();

		count = 0; 
		this.handle[count].src = 'agartha/moiraedrone-left-1.png';
		this.handle[++count].src = 'agartha/moiraedrone-left-2.png';
		this.handle[++count].src = 'agartha/moiraedrone-left-lpunch.png';
		this.handle[++count].src = 'agartha/moiraedrone-left-rpunch.png';

		this.handle[++count].src = 'agartha/moiraedrone-right-1.png';
		this.handle[++count].src = 'agartha/moiraedrone-right-2.png';
		this.handle[++count].src = 'agartha/moiraedrone-right-lpunch.png';
		this.handle[++count].src = 'agartha/moiraedrone-right-rpunch.png';

		return;
	}

	this.SetDirection = function(direction) {

		if (this.direction == direction)
			return;

		this.direction = direction;

		switch (this.direction) {

			case this._direction.Left:
				this.index = 0; break;

			case this._direction.Right:
				this.index = 4; break;
		}

		return;
	}

	this.SetRestrictedBoundary = function(x, y, w, h) {

		this.restricted_boundary = new Rectangle(x, y, w, h);
		return;
	}

	this.FrameSet = function(start, stop) {

		if (this.index >= stop)
			this.index = start;
		else this.index++;

		return;
	}

	this.UpdateFrame = function() {

		if (this.state == this._state.Laser)
			return false;

		if (this.delay_flip.Process() == true)
			return false;

		switch (this.direction) {
		
			case this._direction.Left:
				this.FrameSet(0, 1); break;

			case this._direction.Right:
				this.FrameSet(4, 5); break;
		}

		return true;
	}


	this.UpdateState = function() {

		if (this.state == this._state.Purge) return true;

		if (this.viewport_manager.InBound(this.current) == false)
			return true;

		switch (this.state) { case this._state.Burst: {
			
			if (not_equal(this.projectile_burst.state, this._state.Purge)) {
				this.projectile_burst.Process();
				return true; }

			this.SetState(this._state.Purge);
			return true;
		}

		case this._state.Laser: {
				
			if (this.delay_waitlaser.Process() == false)
				this.SetState(this._state.Normal);

			break;
		}

		case this._state.Damage: {

			if (this.delay_damage.Process() == false)
				this.SetState(this._state.Normal);
			break;
		}}

		return false;
	}

	this.Process = function() {

		if (this.UpdateState() == true)
			return;

		if (this.delay_createlaser.Process() == false) {

			this.CreateLaser();
			return false;
		}

		this.UpdateFrame();
		this.UpdatePoint();

		this.current = new Rectangle(this.x+this.offset_x,
			this.y+this.offset_y, this.w, this.h);

		this.playable.InBoundTarget(this);
		this.InBoundPlayableLaser(this.playable);
		this.projectile_laser.Process();
		this.Draw();
		return;
	}

	this.Draw = function() {

		if (this.state == this._state.Damage)
			if (this.delay_flip.Process() == true) return;

		display.drawImage(this.handle[this.index], this.x, this.y);
		return;
	}

	this.Destroy = function() {

		this.state = this._state.Purge;
	
		this.x = 0; this.y = 0;
		this.w = 0; this.h = 0;

		this.direction = 0;
		this.health = 0; this.full_health = 0;
		this.index = 0; this.image_w = 0;
		this.offset_x = 0; this.offset_y = 0;

		this.boundary = null; this.projectile_burst = null;
		this.current = null; this.handle = null;
		this.restricted_boundary = null;
		this.projectile_laser = null; this.left_jab = false;
	
		this.delay_flip = null; this.delay_move = null;
		this.delay_damage = null;

		return;
	}
}
