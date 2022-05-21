
function _playable_moirae_createsonar() {

	if (this.projectile_sonar.state != this.projectile_sonar._state.Purge)
		return;

	this.projectile_sonar.Create();
	this.projectile_sonar.SetDirection(this.direction);

	switch (this.projectile_sonar.direction) {
				
		case this._direction.Left:

			this.projectile_sonar.SetPoint(this.x, this.y+16);
			break;

		case this._direction.Right: 

			this.projectile_sonar.SetPoint(this.x+(this.image_w/2),
				this.y+16);
 			break;

		case this._direction.Up:

			this.projectile_sonar.SetPoint(this.x+14,
				this.y);
			break;

		case this._direction.Down:

			this.projectile_sonar.SetPoint(this.x+14,
				this.y+(this.image_w/2));
			break;
	}

	return;
}

function _playable_moirae_createprojectile() {

	var selected_consumable = this.hud_manager.selected_consumable;

	switch (selected_consumable) {

		case this._consumable.AirJar: this.CreateAirJar(); break;
		case this._consumable.HealthJar: this.CreateHealthJar(); break;
		case this._consumable.Bomb: this.CreateBomb(); break;
		case this._consumable.MegaBomb: this.CreateMegaBomb(); break;
		case this._consumable.Laser: this.CreateLaser(); break;
		case this._consumable.Shield: this.CreateShield(); break;
	}

	return;
}

function _playable_moirae_createairjar() {

	if (this.hud_manager.inventory[this._consumable.AirJar] <= 0)
		return;

	if (this.breath >= 3) return;

	this.breath++;
	this.delay_breath.count = 0;

	this.hud_manager.SetConsumable(this._consumable.AirJar, -1);
	
	this.projectile_burst.Create();
	this.projectile_burst.SetPoint(this.x+(this.image_w-24)/2,
		this.y+(this.image_w-24)/2);

	this.SetState(this._state.Collect);
	return;
}

function _playable_moirae_createhealthjar() {

	if (this.hud_manager.inventory[this._consumable.HealthJar] <= 0)
			return;
	if (this.health >= 6) return;

	this.health++;

	this.hud_manager.SetConsumable(this._consumable.HealthJar, -1);
	
	this.projectile_burst.Create();
	this.projectile_burst.SetPoint(this.x+(this.image_w-24)/2,
		this.y+(this.image_w-24)/2);

	this.SetState(this._state.Collect);
	return;
}

function _playable_moirae_createbomb() {

	if (this.projectile_bomb.state != this.projectile_bomb._state.Purge)
		return;

	if (this.hud_manager.inventory[this._consumable.Bomb] <= 0) return;

	this.projectile_bomb.Create();
	this.hud_manager.SetConsumable(this._consumable.Bomb, -1);

	switch (this.direction) {
				
		case this._direction.Left:

			this.projectile_bomb.SetPoint(this.x, this.y+12);
			break;

		case this._direction.Right: 

			this.projectile_bomb.SetPoint(this.x+(this.image_w/2),
				this.y+12);
 			break;

		case this._direction.Up:

			this.projectile_bomb.SetPoint(this.x+12,
				this.y);
			break;

		case this._direction.Down:

			this.projectile_bomb.SetPoint(this.x+12,
				this.y+(this.image_w/2));
			break;
	}

	return;
}

function _playable_moirae_createmegabomb() {

	if (this.projectile_bomb.state != this.projectile_bomb._state.Purge)
		return;

	if (this.hud_manager.inventory[this._consumable.MegaBomb] <= 0) return;

	this.projectile_bomb._projectile_megabomb_create();
	this.hud_manager.SetConsumable(this._consumable.MegaBomb, -1);

	switch (this.direction) {
				
		case this._direction.Left:

			this.projectile_bomb.SetPoint(this.x, this.y+12);
			break;

		case this._direction.Right: 

			this.projectile_bomb.SetPoint(this.x+(this.image_w/2),
				this.y+12);
 			break;

		case this._direction.Up:

			this.projectile_bomb.SetPoint(this.x+12,
				this.y);
			break;

		case this._direction.Down:

			this.projectile_bomb.SetPoint(this.x+12,
				this.y+(this.image_w/2));
			break;
	}

	return;
}

function _playable_moirae_createlaser() {

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

		case this._direction.Up:

			this.projectile_laser.SetPoint(this.x, this.y);
			break;

		case this._direction.Down:

			this.projectile_laser.SetPoint(this.x, this.y);
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

function _playable_moirae_createshield() {

	if (this.projectile_shield.state != this.projectile_laser._state.Purge)
		return;

	if (this.hud_manager.inventory[this._consumable.Shield] <= 0) return;

	this.breath = 3;
	this.projectile_shield.Create();
	this.hud_manager.SetConsumable(this._consumable.Shield, -1);
	return;
}

function _playable_moirae_inbound(boundary) {

	if (InBound(this.next, boundary) == true)
		return true;
			
	return false;
}

function _playable_moirae_inboundx(boundary) {

	if (InBoundX(this.current, this.next, boundary) == true)
			return true;

	return false;
}

function _playable_moirae_inboundy(boundary) {

	if (InBoundY(this.next, this.next, boundary) == true)
		return true;

	return ;
}

function _playable_moirae_setdirection(direction) {

	this.direction = direction;
	this.SetDefaultFrame(this.direction);

	return;
}

function _playable_moirae_setdefaultframe(direction) {

	switch (this.direction) {

		case this._direction.Left:
			this.index = 0; break;

		case this._direction.Right:
			this.index = 4; break;

	}

	return;
}

function _playable_moirae_updatedirection() {

	if (this.TranslateDirection(this.control.left,
		this._direction.Left) == true)
			return;
	if (this.TranslateDirection(this.control.right,
		this._direction.Right) == true)
			return;

	this.keydown_direction = false;
	return;
}

function _playable_moirae_translatedirection(control, direction) {

	if (control == false) return false;

	this.keydown_direction = true;
	if (this.direction == direction)
		return true;

	this.direction = direction;			
	this.SetStartFrame(this.direction);

	return true;
}

function _playable_moirae_setstartframe(direction) {

	switch (this.direction) {

		case this._direction.Left:
			this.index = 0; break;

		case this._direction.Right:
			this.index = 4; break;

	}

	return;
}

function _playable_moirae_loadimage() {

	var count = 0; var total = 8;

	this.handle = new Array(total);
	for (; count < total; count++)
		this.handle[count] = new Image();

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

function _playable_moirae_frameset(start, stop) {

	if (this.index >= stop)
		this.index = start;
	else this.index++;

	return;
}

function _playable_moirae_updateframe() {

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

	return;
}

function _playable_moirae_draw() {

	if ((this.state == this._state.Purge)
		|| (this.state == this._state.Burst))
			return;

	if (this.state == this._state.Damage)
		if (this.delay_flip.Process() == true)
			return;
	this.display_manager.drawImage(this.handle[this.index],
		this.x, this.y);

	if (this.state == this._state.Collect)
		this.projectile_burst.Process();

	return;
}

function _playable_moirae_sethealth(health) {

	if (this._core_method_sethealth(health) == false) {
		this.next.setRectangle(0, 0, 0, 0);
		return false;
	}

	return true;
}

function _playable_moirae_updatenextpoint() {

	this.current.setRectangle(this.x+this.offset_x,
		this.y+this.offset_y, this.w, this.h);
	this.next = this.current.getRectangle();

	this.outbound_x = true; this.outbound_y = true;

	if (this.control.left == true)
		this.next.x-= 2;
	else if (this.control.right == true)
		this.next.x+= 2;

	if (this.control.up == true)
		this.next.y-= 2;
	else if (this.control.down == true)
		this.next.y+= 2;

	return;
}

function _playable_moirae_updatebreath() {

	if (not_equal(this.projectile_shield.state, this._state.Purge))
		return false;

	if (this.delay_breath.Process() == true)
		return false;

	if (this.breath <= 0) {
		this.SetHealth(this.health-1);
		return true;
	}

	this.breath--;
	return true;
}

function _playable_moirae_updatekeydown() {

	if (this.hud_manager.dialog == null)
	if ((this.control.j == true) && (this.keydown_j == false)) {
		this.keydown_j = true; this.CreateLaser(); }

	if ((this.control.l == true) && (this.keydown_l == false)) {
		this.keydown_l = true; this.CreateProjectile(); }

	if ((this.control.i == true) && (this.keydown_i == false)) {
		this.keydown_i = true;
		this.hud_manager.PrintInventory();
	}

	if ((this.control.k == true) && (this.keydown_k == false)) {
		this.keydown_k = true;
		this.hud_manager.SetSelectedConsumable(
		this.hud_manager.selected_consumable+1);
	}

	if ((this.control.i == false) && (this.keydown_i == true))
		this.keydown_i = false;
	if ((this.control.j == false) && (this.keydown_j == true))
		this.keydown_j = false;
	if ((this.control.k == false) && (this.keydown_k == true))
		this.keydown_k = false;
	if ((this.control.l == false) && (this.keydown_l == true))
		this.keydown_l = false;

	return;
}

function _playable_moirae_process() {
		
	if (this.ProcessState() == true)
			return;

	this.UpdateBreath();
	this.UpdateDirection();
	this.UpdateFrame();
	this.UpdateNextPoint();
	this.UpdateKeyDown();

	this.projectile_bomb.InBoundPlayable(this);
	return;
}

function _playable_moirae_processstate() {

	switch (this.state) {

		case this._state.Purge:
			return true;

		case this._state.Burst:
				
			if (this.projectile_burst.state == this.projectile_burst._state.Purge) {
				this.SetState(this._state.Purge);
				return true; }

			this.projectile_burst.Process();
			return true;

		case this._state.Damage:

			if (this.delay_damage.Process() == false)
				this.SetState(this._state.Normal);
			break;

		case this._state.Collect:
				
			if (this.projectile_burst.state == this.projectile_burst._state.Purge)
				this.SetState(this._state.Normal);

			break;

		case this._state.Laser: {
				
			if (this.delay_waitlaser.Process() == false)
				this.SetState(this._state.Normal);

			break;
		}
	}

	return false;
}

function _playable_moirae_update() {

	if (this.state == this._state.Purge)
		return;

	if (this.outbound_x) this.x = this.next.x-this.offset_x;
	if (this.outbound_y) this.y = this.next.y-this.offset_y;

	this.projectile_bomb.Process();
	this.projectile_laser.Process();
	this.projectile_sonar.Process();

	this.Draw();

	this.projectile_shield.Process();
	return;
}

function _playable_moirae_dispatch() {

	this.control = keyboard;
	this.current_level = 0;

	this.display_manager = new _core_displaymanager();
	this.display_manager.playable = this;
	
	this.viewport_manager = new _core_viewportmanager();
	this.viewport_manager.playable = this;

	this.hud_manager = new _core_hudmanager();
	this.hud_manager.playable = this;

	this.display_manager.Create();
	this.viewport_manager.Create();
	this.hud_manager.Create();

	this.Create();
	return;
}

function _playable_moirae_create() {

	this.SetPoint(0, 0);
	this.w = 12; this.h = 12; this.image_w = 48;
	this.offset_x = 18; this.offset_y = 18;

	this.health = 0; this.breath = 0;
	this.index = 0;

	this.current = new Rectangle(0, 0, 0, 0);
	this.next = new Rectangle(0, 0, 0, 0);
	this.outbound_x = true; this.outbound_y = true;
	this.left_jab = true;

	this.delay_breath = new Delay(0, 1500);
	this.delay_flip = new Delay(0, 20);
	this.delay_damage = new Delay(0, 60);
	this.delay_waitlaser = new Delay(0, 10);

	this.keydown_direction = false;
	this.keydown_i = false; this.keydown_j = false;
	this.keydown_k = false; this.keydown_l = false;

	this.LoadImage();
	this.SetState(this._state.Normal);
	this.SetDirection(this._direction.Left);
	
	this.projectile_sonar = new _projectile_sonar();
	this.projectile_burst = new _projectile_burst();
	this.projectile_bomb = new _projectile_bomb();
	this.projectile_laser = new _projectile_laser();
	this.projectile_shield = new _projectile_shield();

	this.projectile_bomb.playable = this;
	this.projectile_laser.playable = this;
	this.projectile_sonar.playable = this;
	this.projectile_shield.playable = this;

	this.projectile_sonar.LoadImage();
	this.projectile_burst.LoadImage();
	this.projectile_laser.LoadImageRedLaser();
	this.projectile_shield.LoadImageRedShield();

	return;
} 

function _playable_moirae_destroy() {

	this.state = this._state.Purge;
	this.direction = this._direction.Left;

	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;
	this.image_w = 0;

	this.health = 0; this.breath = 0;

	this.delay_damage = null; 
	this.delay_breath = null;	

	this.current = null; this.next = null;
	this.offset_x = 0; this.offset_y = 0;
	this.outbound_x = false; this.outbound_y = false;

	this.index = 0;
	this.handle = null;
	this.delay_flip = null;	

	this.keydown_direction = false;
	this.keydown_i = false; this.keydown_j = false;
	this.keydown_k = false; this.keydown_l = false;

	this.projectile_sonar = null;
	this.projectile_burst = null;
	this.projectile_bomb = null;
	this.projectile_laser = null;
	
	return;
}

function _playable_moirae() {

	this._core_method_sethealth = _core_method_sethealth;

	this._state = new _core_state();
	this._direction = new _core_direction();
	this._consumable = new _core_consumable();

	this.control = null; 
	this.display_manager = null;
	this.viewport_manager = null;
	this.hud_manager = null;

	this.state = this._state.Purge;
	this.direction = this._direction.Left;

	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;
	this.image_w = 0;

	this.health = 0; this.breath = 0;
	this.delay_damage = null; 
	this.delay_breath = null;	

	this.current = null; this.next = null;
	this.offset_x = 0; this.offset_y = 0;
	this.outbound_x = false; this.outbound_y = false;

	this.index = 0;
	this.handle = null;
	this.delay_flip = null;	

	this.keydown_direction = false;
	this.keydown_i = false; this.keydown_j = false;
	this.keydown_k = false; this.keydown_l = false;

	this.projectile_sonar = null;
	this.projectile_burst = null;
	this.projectile_bomb = null;
	this.projectile_laser = null;
	this.projectile_shield = null;
	
	this.SetState = _core_method_setstate;
	this.SetPoint = _core_method_setpoint;

	this.CreateProjectile = _playable_moirae_createprojectile;
	this.CreateSonar = _playable_moirae_createsonar;

	this.CreateAirJar = _playable_moirae_createairjar;
	this.CreateHealthJar = _playable_moirae_createhealthjar;
	this.CreateBomb = _playable_moirae_createbomb;
	this.CreateMegaBomb = _playable_moirae_createmegabomb;
	this.CreateLaser = _playable_moirae_createlaser;
	this.CreateShield = _playable_moirae_createshield;

	this.Dispatch = _playable_moirae_dispatch;
	this.Create = _playable_moirae_create;
	this.Destroy = _playable_moirae_destroy;

	this.InBound = _playable_moirae_inbound;
	this.InBoundX = _playable_moirae_inboundx;
	this.InBoundY = _playable_moirae_inboundy;

	this.SetDirection = _playable_moirae_setdirection;
	this.SetDefaultFrame = _playable_moirae_setdefaultframe;

	this.UpdateDirection = _playable_moirae_updatedirection;
	this.TranslateDirection = _playable_moirae_translatedirection;
	this.SetStartFrame = _playable_moirae_setstartframe;

	this.LoadImage = _playable_moirae_loadimage;
	this.FrameSet = _playable_moirae_frameset;
	this.UpdateFrame = _playable_moirae_updateframe;
	this.Draw = _playable_moirae_draw;
	this.SetHealth = _playable_moirae_sethealth;
	this.SetShieldHealth = _core_method_setshieldhealth;
	
	this.UpdateNextPoint = _playable_moirae_updatenextpoint;
	this.UpdateBreath = _playable_moirae_updatebreath;
	this.UpdateKeyDown = _playable_moirae_updatekeydown;
	
	this.Process = _playable_moirae_process;
	this.ProcessState = _playable_moirae_processstate;
	this.Update = _playable_moirae_update;
}
