
function _core_state() {

	var count = 0;

	this.Purge = count;
	this.Normal = ++count;
	this.Damage = ++count;
	this.Burst = ++count;
	this.Consumable = ++count;
	this.FadeAway = ++count;

	this.Reverse = ++count;
	this.Collect = ++count;
	this.Laser = ++count;
	this.Hunt = ++count;
	this.Bubble = ++count;
	this.Hologram = ++count;
	this.Descend = ++count;

	this.Loading = ++count;
	this.Summary = ++count;
	this.Secondary = ++count;
}

function _core_direction() {

	var count = 0;

	this.Left = count;
	this.Right = ++count;
	this.Up = ++count;
	this.Down = ++count;
}

function _core_method_setstate(state) {

	this.state = state;

	if (this.state == this._state.Purge)
		this.Destroy();
	return;
}

function _core_method_setpoint(x, y) {

	this.x = x; this.y = y;

	this.current = new Rectangle(this.x+this.offset_x,
		this.y+this.offset_y, this.w, this.h);
	return;
}

function _core_method_updatestate() {

	if (this.state == this._state.Purge) return true;

	if (this.viewport_manager.InBound(this.current) == false)
		return true;

	switch (this.state) { case this._state.Burst: {
			
		if (not_equal(this.projectile_burst.state, this._state.Purge)) {
			this.projectile_burst.Process();
			return true; }

		this.projectile_consumable.Create(this.RandConsumable());
		this.projectile_consumable.SetPoint(this.x+(this.image_w-24)/2,
			this.y+(this.image_w-24)/2);

		this.SetState(this._state.Consumable);
		return true;
	}

	case this._state.Consumable: {

		if (this.projectile_consumable.state == this._state.Purge) {
			this.SetState(this._state.Purge);
			return true; }

		this.projectile_consumable.Update();
		return true;
	}

	case this._state.Damage: {

		if (this.delay_damage.Process() == false)
			this.SetState(this._state.Normal);
		break;
	}}

	return false;
}

function _core_method_inbound(boundary) {

	if (InBound(this.current, boundary) == true)
		return true;
			
	return false;
}

function _core_method_sethealth(health) {

	if (this.state == this._state.Damage)
		return;

	this.health = health;
	if (this.health > 0) {

		this.hud_manager.DispatchTargetHealth(this);
		this.SetState(this._state.Damage);
		return;
	} else this.health = 0;

	this.projectile_burst.Create();
	this.projectile_burst.SetPoint(this.x+(this.image_w-24)/2,
		this.y+(this.image_w-24)/2);

	this.hud_manager.DispatchTargetHealth(this);
	this.SetState(this._state.Burst);

	return;
}

function _cpu_bluejelly() {

	this._state = new _core_state();
	this._consumable = new _core_consumable();

	this.playable = null;
	this.display_manager = null;
	this.viewport_manager = null;
	this.hud_manager = null;

	this._core_method_setpoint = _core_method_setpoint;

	this.SetState = _core_method_setstate;
	this.SetHealth = _core_method_sethealth;
	this.UpdateState = _core_method_updatestate;
	this.InBound = _core_method_inbound;

	this.state = this._state.Purge;

	this.id = 0;
	this.health = 0; 
	this.full_health = 0;

	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;
	this.image_w = 0;

	this.offset_x = 0; this.offset_y = 0;
	this.current = null;
	this.restricted_boundary = null;

	this.index = 0;
	this.handle = null;

	this.projectile_burst = null;
	this.projectile_consumable = null;
	
	this.delay_flip = null;
	this.delay_blink = null;
	this.delay_damage = null;

	this.Destroy = function() {

		this.id = 0;
		this.health = 0; 
		this.full_health = 0;

		this.x = 0; this.y = 0;
		this.w = 0; this.h = 0;
		this.image_w = 0;

		this.offset_x = 0; this.offset_y = 0;
		this.current = null;
		this.restricted_boundary = null;

		this.index = 0;
		this.handle = null;

		this.projectile_burst = null;
		this.projectile_consumable = null;
	
		this.delay_flip = null;
		this.delay_blink = null;
		this.delay_damage = null;

		return;
	}
	
	this.Create = function() {

		this.display_manager = this.playable.display_manager;
		this.viewport_manager = this.playable.viewport_manager;
		this.hud_manager = this.playable.hud_manager;

		this.id = Math.floor(Math.random()*1000);
		this.health = 3;
		this.full_health = 3;

		this.SetPoint(0, 0);
		this.w = 10; this.h = 10; this.image_w = 24;
		this.offset_x = 7; this.offset_y = 7;
		
		this.index = 0;
		if (this.handle == null) this.LoadImage();

		this.projectile_burst = new _projectile_burst();
		this.projectile_burst.LoadImage();

		this.projectile_consumable = new _projectile_consumable();
		this.projectile_consumable.playable = this.playable;

		this.delay_flip = new Delay(0, 50);
		this.delay_blink = new Delay(0, 8);
		this.delay_damage = new Delay(0, 30);

		this.SetState(this._state.Normal);
		return;
	}

	this._cpu_lionsmane_create = function() {

		this._cpu_lionsmane_loadimage();
		this.Create();

		return;
	}

	this._cpu_lionsmane_loadimage = function() {

		this.handle = new Array(3);
		for (var count = 0; count < this.handle.length; count++)
			this.handle[count] = new Image();

		this.handle[0].src = 'agartha/lionsmane-1.png';
		this.handle[1].src = 'agartha/lionsmane-2.png';
		this.handle[2].src = 'agartha/lionsmane-3.png';

		return;
	}

	this.LoadImage = function() {

		this.handle = new Array(3);
		for (var count = 0; count < this.handle.length; count++)
			this.handle[count] = new Image();

		this.handle[0].src = 'agartha/bluejelly-1.png';
		this.handle[1].src = 'agartha/bluejelly-2.png';
		this.handle[2].src = 'agartha/bluejelly-3.png';

		return;
	}

	this.SetPoint = function(x, y) {

		this._core_method_setpoint(x, y);
		this.restricted_boundary = new Rectangle(parseInt(this.x/320)*320,
			parseInt(this.y/240)*240, 320, 240);

		return;
	}

	this.RandConsumable = function() {

		var id = new Date().getTime()%2;

		switch (id) { case 0: return this._consumable.AirJar; }
		return this._consumable.HealthJar;
	}

	this.UpdateFrame = function() {

		if (this.delay_flip.Process() == true)
			return;

		switch (this.state) { case this._state.Normal: {

			if (this.index == 2) {
				this.SetState(this._state.Reverse);
				this.index--; } else this.index++;

			break;
		}

		case this._state.Reverse: {

			if (this.index == 0) {
				this.SetState(this._state.Normal);
				this.index++; } else this.index--;

			break;
		}}

		return;
	}

	this.Process = function() {

		if (this.UpdateState() == true)
			return;

		if (this.y <= this.restricted_boundary.y) {

			this.projectile_burst.Create();
			this.projectile_burst.SetPoint(this.x+(this.image_w-24)/2,
				this.y+(this.image_w-24)/2);

			this.SetState(this._state.Burst);
			return;
		}
		
		this.UpdateFrame();

		if (this.delay_flip.Process() == false)
			this.y--;

		this.current.setRectangle(this.x+this.offset_x,
			this.y+this.offset_y, this.w, this.h);

		this.playable.InBoundTarget(this);
		this.Draw();
		return;
	}

	this.Draw = function() {

		if (this.state == this._state.Damage)
			if (this.delay_blink.Process() == true)
				return;

		this.display_manager.drawImage(this.handle[this.index],
			this.x, this.y);
		return;
	}
}
