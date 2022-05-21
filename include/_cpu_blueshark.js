function _cpu_blueray_create() {

	this.handle = new Array(8);
	for (var count = 0; count < this.handle.length; count++)
		this.handle[count] = new Image();
 
	this.handle[0].src = 'agartha/blueray-left-1.png';
	this.handle[1].src = 'agartha/blueray-left-2.png';
	this.handle[2].src = 'agartha/blueray-left-3.png';
	this.handle[3].src = 'agartha/blueray-left-1.png';

	this.handle[4].src = 'agartha/blueray-right-1.png';
	this.handle[5].src = 'agartha/blueray-right-2.png';
	this.handle[6].src = 'agartha/blueray-right-3.png';
	this.handle[7].src = 'agartha/blueray-right-1.png';

	this.Create();

	this.flag_hostile = false;
	this.delay_flip.total = 18;

	return
}

function _cpu_brownray_create() {

	this.handle = new Array(8);
	for (var count = 0; count < this.handle.length; count++)
		this.handle[count] = new Image();
 
	this.handle[0].src = 'agartha/brownray-left-1.png';
	this.handle[1].src = 'agartha/brownray-left-2.png';
	this.handle[2].src = 'agartha/brownray-left-3.png';
	this.handle[3].src = 'agartha/brownray-left-1.png';

	this.handle[4].src = 'agartha/brownray-right-1.png';
	this.handle[5].src = 'agartha/brownray-right-2.png';
	this.handle[6].src = 'agartha/brownray-right-3.png';
	this.handle[7].src = 'agartha/brownray-right-1.png';

	this.Create();

	this.flag_hostile = false;
	this.delay_flip.total = 18;

	return
}

function _cpu_reefshark_create() {

	this._cpu_reefshark_loadimage();
	this.Create();

	return
}

function _cpu_reefshark_loadimage() {

	this.handle = new Array(8);
	for (var count = 0; count < this.handle.length; count++)
		this.handle[count] = new Image();
 
	this.handle[0].src = 'agartha/reefshark-left-1.png';
	this.handle[1].src = 'agartha/reefshark-left-2.png';
	this.handle[2].src = 'agartha/reefshark-left-3.png';
	this.handle[3].src = 'agartha/reefshark-left-bite-1.png';

	this.handle[4].src = 'agartha/reefshark-right-1.png';
	this.handle[5].src = 'agartha/reefshark-right-2.png';
	this.handle[6].src = 'agartha/reefshark-right-3.png';
	this.handle[7].src = 'agartha/reefshark-right-bite-1.png';

	return;
}

function _cpu_blueshark_updatehunt() {

	if (this.playable.state == this.playable._state.Purge)
		return false;
	if (this.playable.state == this.playable._state.Burst)
		return false;

	if (this.flag_hostile == false) return false;

	if (this.playable.InBound(this.restricted_boundary) == false)
		return false;

	this.hunting_boundary.setRectangle(this.x-(100-this.image_w)/2,
		this.y-(100-this.image_w)/2, 100, 100 );

	if (this.playable.InBound(this.hunting_boundary) == false)
		return false;

	this.flag_hunt = true;

	if (this.delay_flip.Process() == false) {

		if (this.x < this.playable.x)
			this.SetDirection(this._direction.Right);
		else if (this.x > this.playable.x)
			this.SetDirection(this._direction.Left);
	}

	if (this.delay_move.Process() == true)
		return true;

	if (this.direction == this._direction.Left) this.x-= 3;
		else if (this.direction == this._direction.Right) this.x+= 3;

	if (this.y < this.playable.y) this.y++;
		else if (this.y > this.playable.y) this.y--;

	return true;
}

function _cpu_blueshark_updatepoint() {

	if (this.delay_move.Process() == true)
		return false;

	if (this.x+this.offset_x+this.w > this.scouting_boundary.x+this.scouting_boundary.w)
		this.SetDirection(this._direction.Left);
	else if (this.x+this.offset_x < this.scouting_boundary.x)
		this.SetDirection(this._direction.Right);

	if (this.direction == this._direction.Left) this.x--;
		else if (this.direction == this._direction.Right) this.x++;

	return true;
}

function _cpu_blueshark_randconsumable() {

	var id = new Date().getTime()%3;

	switch (id) {

		case 0: return this._consumable.HealthJar;
		case 1: return this._consumable.Bomb;
	}

	return this._consumable.Laser;
}

function _cpu_blueshark() {

	this._state = new _core_state();
	this._direction = new _core_direction();
	this._consumable = new _core_consumable();

	this.playable = null;
	this.display_manager = null;
	this.viewport_manager = null;
	this.hud_manager = null;

	this.state = this._state.Purge;

	this.flag_hunt = false;
	this.flag_hostile = false;

	this.direction = this._direction.Left; 
	this.health = 0; this.full_health = 0;
	
	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;
	this.image_w = 0;
	
	this.offset_x = 0; this.offset_y = 0;
	this.current = null;
	
	this.scouting_boundary = null;
	this.hunting_boundary = null;
	this.restricted_boundary = null;

	this.index = 0;
	this.handle = null;

	this.projectile_burst = null;
	
	this.delay_flip = null;
	this.delay_move = null;
	this.delay_damage = null;

	this.SetState = _core_method_setstate;
	this.SetPoint = _core_method_setpoint;
	this.SetHealth = _core_method_sethealth;
	this.UpdateState = _core_method_updatestate;
	this.InBound = _core_method_inbound;

	this._cpu_blueray_create = _cpu_blueray_create;
	this._cpu_brownray_create = _cpu_brownray_create;
	this._cpu_reefshark_create = _cpu_reefshark_create;
	this._cpu_reefshark_loadimage =  _cpu_reefshark_loadimage;

	this.UpdateHunt = _cpu_blueshark_updatehunt;
	this.UpdatePoint = _cpu_blueshark_updatepoint;
	this.RandConsumable = _cpu_blueshark_randconsumable;

	this.Destroy = function() {

		this.flag_hunt = false;
		this.flag_hostile = false;

		this.direction = this._direction.Left; 
		this.health = 0;  this.full_health = 0;
	
		this.x = 0; this.y = 0;
		this.w = 0; this.h = 0;
		this.image_w = 0;
	
		this.offset_x = 0; this.offset_y = 0;
		this.current = null;
	
		this.scouting_boundary = null;
		this.hunting_boundary = null;
		this.restricted_boundary = null;

		this.index = 0;
		this.handle = null;

		this.projectile_burst = null;
	
		this.delay_flip = null;
		this.delay_move = null;
		this.delay_damage = null;

		return;
	}

	this.Create = function() {

		this.display_manager = this.playable.display_manager;
		this.viewport_manager = this.playable.viewport_manager;
		this.hud_manager = this.playable.hud_manager;

		this.id = Math.floor(Math.random()*1000);

		this.flag_hunt = false;
		this.flag_hostile = true;

		this.SetDirection(this._direction.Right);

		this.health = 6;
		this.full_health = 6;

		this.SetPoint(0, 0);
		this.w = 32; this.h = 12;
		this.image_w = 48;

		this.offset_x = 8; this.offset_y = 18;
		this.current = new Rectangle(0, 0, 0, 0);

		this.scouting_boundary = new Rectangle(0, 0, 0, 0);
		this.hunting_boundary = new Rectangle(0, 0, 0, 0);
		this.restricted_boundary = new Rectangle(0, 0, 0, 0);

		this.index = 0;
		if (this.handle == null) this.LoadImage();

		this.projectile_burst = new _projectile_burst();
		this.projectile_burst.LoadImage();

		this.projectile_consumable = new _projectile_consumable();
		this.projectile_consumable.playable = this.playable;

		this.delay_flip = new Delay(0, 8);
		this.delay_move = new Delay(0, 1);
		this.delay_damage = new Delay(0, 30);

		this.SetState(this._state.Normal);
		return;
	}

	this.LoadImage = function() {

		this.handle = new Array(8);
		for (var count = 0; count < this.handle.length; count++)
			this.handle[count] = new Image();
 
		this.handle[0].src = 'agartha/blueshark-left-1.png';
		this.handle[1].src = 'agartha/blueshark-left-2.png';
		this.handle[2].src = 'agartha/blueshark-left-3.png';
		this.handle[3].src = 'agartha/blueshark-left-bite-1.png';

		this.handle[4].src = 'agartha/blueshark-right-1.png';
		this.handle[5].src = 'agartha/blueshark-right-2.png';
		this.handle[6].src = 'agartha/blueshark-right-3.png';
		this.handle[7].src = 'agartha/blueshark-right-bite-1.png';

		return;
	}

	this.SetDirection = function(direction) {

		if (this.direction == direction)
			return;

		this.direction = direction;
		switch (this.direction) { case this._direction.Left:
			this.index = 0; break;

		case this._direction.Right:
			this.index = 4; break;
		}

		return;
	}

	this.SetBoundaryWidth = function(w) {

		this.scouting_boundary.setRectangle(this.x, this.y, w, 0);

		this.restricted_boundary.setRectangle(parseInt(this.x/320)*320,
			parseInt(this.y/240)*240, 320, 240 );
		return;
	}

	this.FrameSet = function(start, stop) {

		if (this.flag_hunt == true) {
			this.index = stop+1; this.flag_hunt = false;
			return;	}

		if ((this.index < start) || (this.index > stop)) {
			this.index = start;
			return; }

		switch (this.state) { case this._state.Normal: {

			if (this.index == stop) {
				this.SetState(this._state.Reverse);
				this.index--;
			} else this.index++;

			break;
		}

		case this._state.Reverse: {

			if (this.index == start) {
				this.SetState(this._state.Normal);
				this.index++;
			} else this.index--;

			break;
		}}

		return;
	}

	this.UpdateFrame = function() {

		if (this.delay_flip.Process() == true)
			return false;

		switch (this.direction) { case this._direction.Left:
			this.FrameSet(0, 2); break;

		case this._direction.Right:
			this.FrameSet(4, 6); break;
		}

		return true;
	}

	this.Process = function() {

		if (this.UpdateState() == true)
			return;

		this.UpdateFrame();

		if (this.UpdateHunt() == false)
			this.UpdatePoint();

		this.current = new Rectangle(this.x+this.offset_x,
			this.y+this.offset_y, this.w, this.h);

		this.playable.InBoundTarget(this);
		this.Draw();
		return;
	}

	this.Draw = function() {

		if (this.state == this._state.Damage)
			if (this.delay_flip.Process() == true) return;

		this.display_manager.drawImage(this.handle[this.index], this.x, this.y);
		return;
	}
}
