
function _core_method_setshieldhealth(health) {

	if (this.state == this._state.Damage)
		return;

	this.projectile_shield.health = health;
	if (this.projectile_shield.health > 0) {

		this.SetState(this._state.Damage);
		return;
	}

	this.projectile_shield.SetState(this._state.Purge);
	return;
}

function _projectile_shield_draw() {

	if (this.delay_flip.Process() == false) {
	
		if (this.index >= 1) this.index = 0;
			else  this.index++;
	}

	if (this.delay_shield.Process() == false) {
	
		if (this.shield_index >= 3) this.shield_index = 0;
			else  this.shield_index++;

	}

	if (this.delay_blink.Process() == false)
	display.drawImage(this.shield[this.shield_index], this.x, this.y);

	display.drawImage(this.handle[this.index], this.x, this.y);
	return;
}

function _projectile_shield_process() {

	if (this.state == this._state.Purge)
		return;

	this.x = this.playable.x;
	this.y = this.playable.y;

	this.Draw();		
	return;
}

function _projectile_shield_inbound(boundry) {

	if (InBound(this.current, boundry) == true)
		return true;
			
	return false;
}

function _projectile_shield_loadimage() {

	this.handle = new Array(2);
	this.handle[0] = new Image();
	this.handle[1] = new Image();

	this.handle[0].src = 'agartha/shield1-device-1.png';
	this.handle[1].src = 'agartha/shield1-device-2.png';

	this.shield = new Array(4);
	this.shield[0] = new Image();
	this.shield[1] = new Image();

	this.shield[2] = new Image();
	this.shield[3] = new Image();

	this.shield[0].src = 'agartha/shield1-energy-1.png';
	this.shield[1].src = 'agartha/shield1-energy-2.png';
	this.shield[2].src = 'agartha/shield1-energy-3.png';
	this.shield[3].src = 'agartha/shield1-energy-4.png';

	return;
}

function _projectile_shield_loadimageredshield() {

	this.handle = new Array(2);
	this.handle[0] = new Image();
	this.handle[1] = new Image();

	this.handle[0].src = 'agartha/shield1-device-1.png';
	this.handle[1].src = 'agartha/shield1-device-2.png';

	this.shield = new Array(4);
	this.shield[0] = new Image();
	this.shield[1] = new Image();

	this.shield[2] = new Image();
	this.shield[3] = new Image();

	this.shield[0].src = 'agartha/shield2-energy-1.png';
	this.shield[1].src = 'agartha/shield2-energy-2.png';
	this.shield[2].src = 'agartha/shield2-energy-3.png';
	this.shield[3].src = 'agartha/shield2-energy-4.png';

	return;
}

function _projectile_shield_create() {

	// constant:
	this.health = 6; this.index = 0
	this.shield_index = 0;

	// initial:
	this.SetPoint(0, 0);
		
	// assign:
	this.SetState(this._state.Normal);

	this.delay_flip = new Delay(0, 40);
	this.delay_shield = new Delay(0, 10);
	this.delay_blink = new Delay(0, 2);

	return;
}

function _projectile_shield_destroy() {

	this.state = this._state.Purge;
	this.direction = 0; this.index = 0;
	this.x = 0; this.y = 0;
	this.health = 0;

	this.current = null;
	this.delay_flip = null;

	return;
}

function _projectile_shield() {

	this._state = new _core_state();

	this.state = this._state.Purge;	

	this.playable = null;
	this.x = 0; this.y = 0;
	this.health = 0;

	this.current = null; this.handle = null;
	this.delay_flip = null;

	this.SetState = _core_method_setstate;
	this.SetPoint = _core_method_setpoint;
	this.SetShieldHealth = _core_method_setshieldhealth;

	this.Create = _projectile_shield_create;
	this.Destroy = _projectile_shield_destroy;

	this.InBound = _projectile_shield_inbound;
	this.LoadImage = _projectile_shield_loadimage;
	this.LoadImageRedShield = _projectile_shield_loadimageredshield;

	this.Process = _projectile_shield_process;
	this.Draw = _projectile_shield_draw;
}

