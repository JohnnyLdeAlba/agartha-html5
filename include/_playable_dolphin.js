
function _playable_dolphin_playableinbomb(target) {

	if (target.state == this._state.Purge)
		return false;
	if (target.state == this._state.Burst)
		return false;

	if (this.projectile_bomb.state == this._state.Purge)
		return false;
	if (this.projectile_bomb.state == this._state.Normal)
		return false;

	if (target.state == this._state.Purge)
		return false;
	if (target.state == this._state.Burst)
		return false;

	if (this.projectile_bomb.InBound(target.current) == true) {

		target.SetHealth(target.health-1);
		return true;
	}

	return false;
}

function _playable_dolphin_inboundplayable(target) {

	if (this.state == this._state.Purge)
		return false;
	if (this.state == this._state.Burst)
		return false;
	if (this.state == this._state.Damage)
		return false;

	if (target.state == this._state.Purge)
		return false;
	if (target.state == this._state.Burst)
		return false;

	if (this.InBoundX(target.current))
		this.outbound_x = false;
	if (this.InBoundY(target.current))
		this.outbound_y = false;

	if (this.InBound(target.current) == true) {

		if (not_equal(this.projectile_shield.state, this._state.Purge))
			this.SetShieldHealth(this.projectile_shield.health-1);

		else this.SetHealth(this.health-1);

		return true;
	}

	return false;
}

function _playable_dolphin_inboundbomb(target) {

	if (this.state == this._state.Purge)
		return false;
	if (this.state == this._state.Burst)
		return false;

	if (this.projectile_bomb.state == this._state.Purge)
		return false;
	if (this.projectile_bomb.state == this._state.Normal)
		return false;

	if (target.state == this._state.Purge)
		return false;
	if (target.state == this._state.Burst)
		return false;

	if (this.projectile_bomb.InBound(target.current) == true) {

		target.SetHealth(target.health-10);
		return true;
	}

	return false;
}

function _playable_dolphin_inboundlaser(target) {

	if (this.state == this._state.Purge)
		return false;
	if (this.state == this._state.Burst)
		return false;

	if (this.projectile_laser.state == this._state.Purge)
		return false;

	if (target.state == this._state.Purge)
		return false;
	if (target.state == this._state.Burst)
		return false;

	if (this.projectile_laser.InBound(target.current) == true) {

		target.SetHealth(target.health-4);
		return true;
	}

	return false;
}

function _playable_dolphin_inboundsonar(target) {

	if (this.state == this._state.Purge)
		return false;
	if (this.state == this._state.Burst)
		return false;

	if (this.projectile_sonar.state == this._state.Purge)
		return false;

	if (target.state == this._state.Purge)
		return false;
	if (target.state == this._state.Burst)
		return false;

	if (this.projectile_sonar.InBound(target.current) == true) {

		this.projectile_sonar.SetState(this._state.Purge);
		target.SetHealth(target.health-1);

		return true;
	}

	return false;
}

function _playable_dolphin_inboundsprite(projectile_sprite, target) {

	if (this.state == this._state.Purge)
		return false;
	if (this.state == this._state.Burst)
		return false;

	if (projectile_sprite.state == this._state.Purge)
		return false;

	if (target.state == this._state.Purge)
		return false;
	if (target.state == this._state.Burst)
		return false;

	if (projectile_sprite.target == null) {

		for (var count = 0; count < this.projectile_sprite.length; count++) {

			if (not_equal(this.projectile_sprite[count].target, null)) 
			if (this.projectile_sprite[count].target.id == target.id) 
				return;
		}
		
		projectile_sprite.target = target;
		projectile_sprite.SetPoint(this.x+(this.image_w/2),
			this.y+(this.image_w/2));
	}

	if (projectile_sprite.InBound(target.current) == true) {

		projectile_sprite.SetState(this._state.Purge);
		target.SetHealth(target.health-2);
		return true;
	}

	return false;
}


function _playable_dolphin_inboundtarget(target) {

	this.InBoundPlayable(target);
	this.InBoundBomb(target);
	this.InBoundLaser(target);
	this.InBoundSonar(target);

	for (var count = 0; count < this.projectile_sprite.length; count++)
		this.InBoundSprite(this.projectile_sprite[count], target);

	return;
}

function _playable_dolphin_createsonar() {

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

function _playable_dolphin_createprojectile() {

	var selected_consumable = this.hud_manager.selected_consumable;

	switch (selected_consumable) {

		case this._consumable.AirJar: this.CreateAirJar(); break;
		case this._consumable.HealthJar: this.CreateHealthJar(); break;
		case this._consumable.Bomb: this.CreateBomb(); break;
		case this._consumable.MegaBomb: this.CreateMegaBomb(); break;

		case this._consumable.Laser:  this.CreateLaser(); break;
		case this._consumable.Sprite:
			for (var count = 0; count < this.projectile_sprite.length; count++)
				this.CreateSprite(this.projectile_sprite[count]); break;

		case this._consumable.Shield: this.CreateShield(); break;
	}

	return;
}

function _playable_dolphin_createairjar() {

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

function _playable_dolphin_createhealthjar() {

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

function _playable_dolphin_createbomb() {

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

function _playable_dolphin_createmegabomb() {

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

function _playable_dolphin_createlaser() {

	if (this.projectile_laser.state != this.projectile_laser._state.Purge)
		return;

	if (this.hud_manager.inventory[this._consumable.Laser] <= 0) return;

	this.projectile_laser.Create();
	this.projectile_laser.SetDirection(this.direction);
	this.hud_manager.SetConsumable(this._consumable.Laser, -1);

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

	return;
}

function _playable_dolphin_createshield() {

	if (this.projectile_shield.state != this._state.Purge)
		return;

	if (this.hud_manager.inventory[this._consumable.Shield] <= 0) return;

	this.breath = 3;
	this.projectile_shield.Create();
	this.hud_manager.SetConsumable(this._consumable.Shield, -1);
	return;
}

function _playable_dolphin_createsprite(projectile_sprite) {

	if (projectile_sprite.state != this._state.Purge)
		return false;

	// if (this.hud_manager.inventory[this._consumable.Shield] <= 0) return;

	projectile_sprite.Create();

	// this.hud_manager.SetConsumable(this._consumable.Shield, -1);
	return;
}

function _playable_dolphin_inbound(boundary) {

	if (InBound(this.next, boundary) == true)
		return true;
			
	return false;
}

function _playable_dolphin_inboundx(boundary) {

	if (InBoundX(this.current, this.next, boundary) == true)
			return true;

	return false;
}

function _playable_dolphin_inboundy(boundary) {

	if (InBoundY(this.next, this.next, boundary) == true)
		return true;

	return ;
}

function _playable_dolphin_setdirection(direction) {

	this.direction = direction;
	this.SetDefaultFrame(this.direction);

	return;
}

function _playable_dolphin_setdefaultframe(direction) {

	switch (this.direction) {

		case this._direction.Left:
			this.index = 0; break;

		case this._direction.Right:
			this.index = 5; break;

		case this._direction.Up:
			this.index = 10; break;

		case this._direction.Down:
			this.index = 14; break;
	}

	return;
}

function _playable_dolphin_updatedirection() {

	if (this.TranslateDirection(this.control.up,
		this._direction.Up) == true)
			return;
	if (this.TranslateDirection(this.control.down,
		this._direction.Down) == true)
			return;

	if (this.TranslateDirection(this.control.left,
		this._direction.Left) == true)
			return;
	if (this.TranslateDirection(this.control.right,
		this._direction.Right) == true)
			return;

	this.keydown_direction = false;
	return;
}

function _playable_dolphin_translatedirection(control, direction) {

	if (control == false) return false;

	this.keydown_direction = true;
	if (this.direction == direction)
		return true;

	this.direction = direction;			
	this.SetStartFrame(this.direction);

	return true;
}

function _playable_dolphin_setstartframe(direction) {

	switch (this.direction) {

		case this._direction.Left:
			this.index = 1; break;

		case this._direction.Right:
			this.index = 6; break;

		case this._direction.Up:
			this.index = 11; break;

		case this._direction.Down:
			this.index = 15; break;
	}

	return;
}

function _playable_dolphin_loadimage() {

	var count = 0; var total = 18;

	this.handle = new Array(total);
	for (; count < total; count++)
		this.handle[count] = new Image();

	count = 0;
	this.handle[count].src = 'agartha/dolphin-left-1.png';
	this.handle[++count].src = 'agartha/dolphin-left-2.png';
	this.handle[++count].src = 'agartha/dolphin-left-3.png';
	this.handle[++count].src = 'agartha/dolphin-left-4.png';
	this.handle[++count].src = 'agartha/dolphin-left-5.png';

	this.handle[++count].src = 'agartha/dolphin-right-1.png'; 
	this.handle[++count].src = 'agartha/dolphin-right-2.png';
	this.handle[++count].src = 'agartha/dolphin-right-3.png';
	this.handle[++count].src = 'agartha/dolphin-right-4.png';
	this.handle[++count].src = 'agartha/dolphin-right-5.png';

	this.handle[++count].src = 'agartha/dolphin-up-1.png';
	this.handle[++count].src = 'agartha/dolphin-up-2.png';
	this.handle[++count].src = 'agartha/dolphin-up-3.png';
	this.handle[++count].src = 'agartha/dolphin-up-4.png';

	this.handle[++count].src = 'agartha/dolphin-down-1.png';
	this.handle[++count].src = 'agartha/dolphin-down-2.png';
	this.handle[++count].src = 'agartha/dolphin-down-3.png';
	this.handle[++count].src = 'agartha/dolphin-down-4.png';

	return;
}

function _playable_dolphin_frameset(start, stop) {

	if ((this.index < start) || (this.index > stop))
		this.index = start;
	else this.index++;

	return;
}

function _playable_dolphin_updateframe() {

	if (this.delay_flip.Process() == true)
		return false;

	if (this.keydown_direction == false) {

		this.SetDefaultFrame(this.direction);
		return;
	}

	switch (this.direction) {
				
		case this._direction.Left:
			this.FrameSet(1, 3);
			break;

		case this._direction.Right: 
			this.FrameSet(6, 8);
 			break;

		case this._direction.Up:
			this.FrameSet(11, 12);
			break;

		case this._direction.Down:
			this.FrameSet(15, 16);
			break;
	}

	return;
}

function _playable_dolphin_draw() {

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

function _playable_dolphin_sethealth(health) {

	if (this._core_method_sethealth(health) == false) {
		this.next.setRectangle(0, 0, 0, 0);
		return false;
	}

	return true;
}

function _playable_dolphin_updatenextpoint() {

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

function _playable_dolphin_updatebreath() {

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

function _playable_dolphin_updatekeydown() {

	if (this.hud_manager.dialog == null)
	if ((this.control.j == true) && (this.keydown_j == false)) {
		this.keydown_j = true; this.CreateSonar(); }

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

function _playable_dolphin_process() {
		
	if (this.ProcessState() == true)
			return;

	this.UpdateBreath();
	this.UpdateDirection();
	this.UpdateFrame();
	this.UpdateNextPoint();
	this.UpdateKeyDown();

	this.PlayableInBomb(this);
	return;
}

function _playable_dolphin_processstate() {

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
	}

	return false;
}

function _playable_dolphin_update() {

	if (this.state == this._state.Purge)
		return;
	if (this.state == this._state.Burst)
		return;

	if (this.outbound_x) this.x = this.next.x-this.offset_x;
	if (this.outbound_y) this.y = this.next.y-this.offset_y;

	this.projectile_bomb.Process();
	this.projectile_laser.Process();
	this.projectile_sonar.Process();

	for (var count = 0; count < this.projectile_sprite.length; count++)
		this.projectile_sprite[count].Process();

	this.Draw();
	this.projectile_shield.Process();
	return;
}

function _playable_dolphin_dispatch() {

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

function _playable_dolphin_create() {

	this.SetPoint(0, 0);
	this.w = 12; this.h = 12; this.image_w = 48;
	this.offset_x = 18; this.offset_y = 18;

	this.health = 0; this.breath = 0;
	this.index = 0;

	this.current = new Rectangle(0, 0, 0, 0);
	this.next = new Rectangle(0, 0, 0, 0);
	this.outbound_x = true; this.outbound_y = true;

	this.delay_breath = new Delay(0, 1500);
	this.delay_flip = new Delay(0, 6);
	this.delay_damage = new Delay(0, 60);

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

	this.projectile_sonar.playable = this;
	this.projectile_bomb.playable = this;
	this.projectile_laser.playable = this;
	this.projectile_sonar.playable = this;
	this.projectile_shield.playable = this;
	
	this.projectile_sonar.LoadImage();
	this.projectile_burst.LoadImage();
	this.projectile_laser.LoadImage();
	this.projectile_shield.LoadImage();

	this.projectile_sprite = new Array(15);

	for (var count = 0; count < this.projectile_sprite.length; count++) {
		this.projectile_sprite[count] = new _projectile_sprite();
		this.projectile_sprite[count].playable = this;
	}

	return;
} 

function _playable_dolphin_destroy() {

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

function _playable_dolphin() {

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

	this.CreateProjectile = _playable_dolphin_createprojectile;
	this.CreateSonar = _playable_dolphin_createsonar;

	this.CreateAirJar = _playable_dolphin_createairjar;
	this.CreateHealthJar = _playable_dolphin_createhealthjar;
	this.CreateBomb = _playable_dolphin_createbomb;
	this.CreateMegaBomb = _playable_dolphin_createmegabomb;
	this.CreateLaser = _playable_dolphin_createlaser;
	this.CreateShield = _playable_dolphin_createshield;
	this.CreateSprite = _playable_dolphin_createsprite;

	this.Dispatch = _playable_dolphin_dispatch;
	this.Create = _playable_dolphin_create;
	this.Destroy = _playable_dolphin_destroy;

	this.InBound = _playable_dolphin_inbound;
	this.InBoundX = _playable_dolphin_inboundx;
	this.InBoundY = _playable_dolphin_inboundy;

	this.PlayableInBomb = _playable_dolphin_playableinbomb;
	this.InBoundPlayable = _playable_dolphin_inboundplayable;
	this.InBoundBomb = _playable_dolphin_inboundbomb;
	this.InBoundLaser = _playable_dolphin_inboundlaser;
	this.InBoundSonar = _playable_dolphin_inboundsonar;
	this.InBoundSprite = _playable_dolphin_inboundsprite;
	this.InBoundTarget = _playable_dolphin_inboundtarget;

	this.SetDirection = _playable_dolphin_setdirection;
	this.SetDefaultFrame = _playable_dolphin_setdefaultframe;

	this.UpdateDirection = _playable_dolphin_updatedirection;
	this.TranslateDirection = _playable_dolphin_translatedirection;
	this.SetStartFrame = _playable_dolphin_setstartframe;

	this.LoadImage = _playable_dolphin_loadimage;
	this.FrameSet = _playable_dolphin_frameset;
	this.UpdateFrame = _playable_dolphin_updateframe;
	this.Draw = _playable_dolphin_draw;
	this.SetHealth = _playable_dolphin_sethealth;
	this.SetShieldHealth = _core_method_setshieldhealth;
	
	this.UpdateNextPoint = _playable_dolphin_updatenextpoint;
	this.UpdateBreath = _playable_dolphin_updatebreath;
	this.UpdateKeyDown = _playable_dolphin_updatekeydown;
	
	this.Process = _playable_dolphin_process;
	this.ProcessState = _playable_dolphin_processstate;
	this.Update = _playable_dolphin_update;
}
