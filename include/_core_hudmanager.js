function _core_consumable() {

	var count = 0;

	this.AirJar = count;
	this.HealthJar = ++count;
	this.Bomb = ++count;
	this.MegaBomb = ++count;
	this.Laser = ++count;
	this.Shield = ++count;
	this.Sprite = ++count;
	this.Coin = ++count;

	this.None = ++count;
}

function _core_hudmanager() {

	this._state = new _core_state();
	this._consumable = new _core_consumable();

	this.display_manager = null;
	this.logical_display = null;
	this.playable = null;

	this.healthmeter = null
	this.airmeter = null;
	this.blink_airmeter = false;
	this.delay_airmeter = null;

	this.selector = null;
	this.handle = null;
	this.text = null;

	this.alphabit = null;
	this.window_container = null;

	this.total = 0;
	this.inventory = null;
	this.selected_consumable = 0;

	this.keydown_j = false;
	this.dialog_index = 0;
	this.dialog = null;
	this.delay_dialog = null;
	
	this.target = null;
	this.target_health = null;
	this.delay_target = null;

	this.Create = function() {

		this.display_manager = this.playable.display_manager;
		this.logical_display = this.display_manager.logical_display;
		this.keyboard = keyboard;

		this.total = 7;
		this.inventory = new Array(this.total+1);

		for (var count = 0; count < this.total+1; count++)
			this.inventory[count] = 0;

		this.LoadImage();
		this.LoadText();
		this.LoadTargetHealth();
		this.LoadWindow();
		
		this.blink_airmeter = false;
		this.delay_airmeter = new Delay(0, 30);

		this.target = null;
		this.delay_target = new Delay(0, 100);

		this.keydown_j = false;
		this.dialog_index = 0; this.dialog = null;
		this.delay_dialog = new Delay(0, 600);

		this.SetSelectedConsumable(this._consumable.None);

		return;
	}

	this.LoadImage = function() {

		var count = 0;

		this.selector = new Image();
		this.selector.src = 'agartha/selector-1.png';		

		this.airmeter = new Array(2);
		this.airmeter[0] = new Image();
		this.airmeter[1] = new Image();
		this.airmeter[0].src = 'agartha/breath-1.png';		
		this.airmeter[1].src = 'agartha/breath-2.png';

		this.healthmeter = new Array(7);
		for (count = 0; count < this.healthmeter.length; count++)
			this.healthmeter[count] = new Image();

		this.healthmeter[0].src = 'agartha/health-0.png';
		this.healthmeter[1].src = 'agartha/health-1.png';
		this.healthmeter[2].src = 'agartha/health-2.png';
		this.healthmeter[3].src = 'agartha/health-3.png';
		this.healthmeter[4].src = 'agartha/health-4.png';
		this.healthmeter[5].src = 'agartha/health-5.png';
		this.healthmeter[6].src = 'agartha/health-6.png';

		this.handle = new Array(this.total+1);
		for (count = 0; count < this.handle.length; count++)
			this.handle[count] = new Image();

		count = 0;
		this.handle[count].src = 'agartha/airjar-1.png';
		this.handle[++count].src = 'agartha/healthjar-1.png';
		this.handle[++count].src = 'agartha/bomb-1.png';
		this.handle[++count].src = 'agartha/bomb-2.png';
		this.handle[++count].src = 'agartha/laser-cannon-1.png';
		this.handle[++count].src = 'agartha/shield-1.png';
		this.handle[++count].src = 'agartha/consumable-photon.png';
		this.handle[++count].src = 'agartha/coin-1.png';

		return;
	}

	this.LoadText = function() {

		var count = 0;
		this.text = new Array(this.total+1);

		this.text[count] = 'AIR JAR';
		this.text[++count] = 'HEALTH JAR';
		this.text[++count] = 'BOMB';
		this.text[++count] = 'MEGA BOMB';
		this.text[++count] = 'LASER';
		this.text[++count] = 'SHIELD';
		this.text[++count] = 'SPRITE';
		this.text[++count] = 'COIN';

		return;
	}

	this.LoadTargetHealth = function() {

		this.target_health = new Array(6);
		for (var count = 0; count < this.handle.length; count++)
			this.target_health[count] = new Image();

		this.target_health[0].src = 'agartha/enemy-health-1.png';
		this.target_health[1].src = 'agartha/enemy-health-2.png';
		this.target_health[2].src = 'agartha/enemy-health-3.png';
		this.target_health[3].src = 'agartha/enemy-health-4.png';
		this.target_health[4].src = 'agartha/enemy-health-5.png';
		this.target_health[5].src = 'agartha/enemy-health-6.png';

		return;
	}

	this.LoadWindow = function() {

		this.window_container = new Array(3);
		this.window_container[0] = new Image();
		this.window_container[1] = new Image();
		this.window_container[2] = new Image();

		this.window_container[0].src = 'agartha/window-caption.png';
		this.window_container[1].src = 'agartha/window-container.png';
		this.window_container[2].src = 'agartha/window-bottom.png';

		this.alphabit = new Array(39);
		for (var count = 0; count < this.alphabit.length; count++)
			this.alphabit[count] = new Image();

		this.alphabit[0].src = 'agartha/alpha-a.png';
		this.alphabit[1].src = 'agartha/alpha-b.png';
		this.alphabit[2].src = 'agartha/alpha-c.png';
		this.alphabit[3].src = 'agartha/alpha-d.png';
		this.alphabit[4].src = 'agartha/alpha-e.png';
		this.alphabit[5].src = 'agartha/alpha-f.png';
		this.alphabit[6].src = 'agartha/alpha-g.png';
		this.alphabit[7].src = 'agartha/alpha-h.png';
		this.alphabit[8].src = 'agartha/alpha-i.png';
		this.alphabit[9].src = 'agartha/alpha-j.png';
		this.alphabit[10].src = 'agartha/alpha-k.png';
		this.alphabit[11].src = 'agartha/alpha-l.png';
		this.alphabit[12].src = 'agartha/alpha-m.png';
		this.alphabit[13].src = 'agartha/alpha-n.png';
		this.alphabit[14].src = 'agartha/alpha-o.png';
		this.alphabit[15].src = 'agartha/alpha-p.png';
		this.alphabit[16].src = 'agartha/alpha-q.png';
		this.alphabit[17].src = 'agartha/alpha-r.png';
		this.alphabit[18].src = 'agartha/alpha-s.png';
		this.alphabit[19].src = 'agartha/alpha-t.png';
		this.alphabit[20].src = 'agartha/alpha-u.png';
		this.alphabit[21].src = 'agartha/alpha-v.png';
		this.alphabit[22].src = 'agartha/alpha-w.png';
		this.alphabit[23].src = 'agartha/alpha-x.png';
		this.alphabit[24].src = 'agartha/alpha-y.png';
		this.alphabit[25].src = 'agartha/alpha-z.png';

		this.alphabit[26].src = 'agartha/alpha-1.png';
		this.alphabit[27].src = 'agartha/alpha-2.png';
		this.alphabit[28].src = 'agartha/alpha-3.png';
		this.alphabit[29].src = 'agartha/alpha-4.png';
		this.alphabit[30].src = 'agartha/alpha-5.png';
		this.alphabit[31].src = 'agartha/alpha-6.png';
		this.alphabit[32].src = 'agartha/alpha-7.png';
		this.alphabit[33].src = 'agartha/alpha-8.png';
		this.alphabit[34].src = 'agartha/alpha-9.png';

		this.alphabit[35].src = 'agartha/alpha-period.png';
		this.alphabit[36].src = 'agartha/alpha-comma.png';
		this.alphabit[37].src = 'agartha/alpha-quote.png';
		this.alphabit[38].src = 'agartha/alpha-more.png';

		return;
	}

	this.GetCharacter = function(character) {

		if (character == '\n') return -2;
		if (character == '0') return 14;

		var table = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789.,\'>"
		var index = table.indexOf(character.charAt(0));

		return index;
	}

	this.DisplayMessage = function(caption, text) {

		this.logical_display.drawImage(this.window_container[0], 24, 30);

		var index;
		for (var count = 0; count < caption.length; count++) {
			index = this.GetCharacter(caption.charAt(count));

			if (index >= 0) this.logical_display
				.drawImage(this.alphabit[index],
					(24+8)+(8*count), 32);
		}

		var position = 0; var line = 0;		
		this.logical_display.drawImage(this.window_container[1],
			24, 42);

		for (var count = 0; count < text.length; count++) {
			index = this.GetCharacter(text.charAt(count));

			if (index >= 0) { this.logical_display
				.drawImage(this.alphabit[index], (24+8)+(8*position), 43+(10*line));
				position++; }

			else if (index == -2) { this.logical_display
				.drawImage(this.window_container[1], 24, 42+(10*(++line)));
				position = 0; }

			else position++;

		}

		this.logical_display.drawImage(this.window_container[2],
			24, 42+(10*(++line)));
		return;
	}

	this.DispatchMessage = function(dialog) {

		this.dialog_index = 1;
		this.dialog = dialog;
		this.delay_dialog.count = 0;

		return;
	}

	this.UpdateMessage = function() {

		if (this.dialog == null) return;

		this.DisplayMessage(this.dialog[0], this.dialog[this.dialog_index]);

		if (this.delay_dialog.Process() == true) {

			if ((this.keyboard.j == true) && (this.keydown_j == false)) {
				this.keydown_j = true; this.delay_dialog.count = 0;
				this.dialog_index++; }
			if ((this.keyboard.j == false) && (this.keydown_j == true))
				this.keydown_j = false;

		} else this.dialog_index++;

		if (this.dialog_index >= this.dialog.length) {

			this.dialog_index = 0; this.dialog = null;
			this.delay_dialog.count = 0;
			this.playable.keydown_j = true;
		}

		return;
	}

	this.DispatchTargetHealth = function(target) {

		this.target = target;
		this.delay_target.count = 0;
		return;
	}

	this.UpdateTargetHealth = function() {

		if (this.target == null) return;
		if (this.target.full_health == null) return;

		if (this.target.health <= 0) {
			this.target = null; return; }

		if (this.delay_target.Process() == false) {
			this.target = null; return; }

		index = 5*(this.target.health/this.target.full_health);
		index = parseInt(index);

		this.display_manager.drawImage(this.target_health[index],
			this.target.x+(this.target.image_w-48)/2, this.target.y-24);

		return;
	}

	this.OutputConsumable = function(id) {

		if (this.inventory[id] <= 0) return;
		return "\n> "+this.text[id]+" X"+this.inventory[id];
	}

	this.PrintInventory = function() {

		var text = new Array(2);
		text[0] = "INVENTORY";
		text[1] = "> SELECTED ITEM > "+this.text[this.selected_consumable]+"\n";

		for (var count = 0; count < this.total; count++)
			text[1]+= this.OutputConsumable(count);

		this.DispatchMessage(text);
		return;
	}

	this.SetSelectedConsumable = function(id) {

		if (id >= this.total) id = this._consumable.AirJar;

		for (var count = id; count < this.total; count++) {

			if (this.inventory[count] > 0) {
				this.selected_consumable = count;
				return; }
		}

		this.selected_consumable = this._consumable.None;
		return; 
	}

	this.SetConsumable = function(id, count) {

		if ((count > 0) && (this.inventory[id] >= 5))
			return;
		else if ((count < 0) && (this.inventory[id] <= 0))
			return;

		this.inventory[id]+= count;
		this.SetSelectedConsumable(id);
		return;
	}

	this.DrawAirMeter = function() {

		var index = 0;

		if ((this.playable.state == this.playable._state.Purge) ||
			(this.playable.breath > 0)) {

			this.logical_display.drawImage(
				this.airmeter[index],  320-102, 0);

			return;
		}
 
		if (this.delay_airmeter.Process() == false) {
			if (this.blink_airmeter == true) this.blink_airmeter = false;
			else this.blink_airmeter = true;
		}

		if (this.blink_airmeter == true) index = 1;
			else index = 0;

		this.logical_display.drawImage(this.airmeter[index], 
			320-102, 0);
		return;
	}

	this.DrawHealthMeter = function() {

		var index = 0;

		if (this.playable.health > 0 && this.playable.health < 6)
			index = this.playable.health;
		else if (this.playable.health >= 6) index = 6;

		this.logical_display.drawImage(this.healthmeter[index], 320-82, 10);
		return;
	}

	this.DrawCoin = function() {

		if (this.inventory[this._consumable.Coin] <= 0)
			return;

		for (var count = 0; count < this.inventory[this._consumable.Coin]; count++)
			this.logical_display.drawImage(this.handle[this._consumable.Coin], (320-82)+(count*10), 10);

		return;
	}

	this.Draw = function() {
		
		this.DrawAirMeter();
		this.DrawHealthMeter();
		this.DrawCoin();

		if (not_equal(this.selected_consumable, this._consumable.None) == true)
			this.logical_display.drawImage(this.handle[this.selected_consumable],
				(320-24)/2, 2);

		this.logical_display.drawImage(this.selector, (320-24)/2, 2);
		return;
	}
}

function _projectile_consumable() {

	this._consumable = new _core_consumable();
	this._state = new _core_state();

	this.playable = null;
	this.display_manager = null;
	this.hud_manager = null;
	
	this.state = this._state.Purge;	
	this.flag_fadeaway = false;
	
	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;

	this.id = 0; this.offset_x = 0;
	this.offset_y = 0; this.total = 0;

	this.handle = null;

	this.SetState = _core_method_setstate;
	this.SetPoint = _core_method_setpoint;

	this.Create = function(id) {

		this.display_manager = this.playable.display_manager;
		this.hud_manager = this.playable.hud_manager;

		this.SetPoint(0, 0);

		this.total = 1;
		this.w = 10; this.h = 10;
		this.offset_x = 7; this.offset_y = 7;

		this.flag_fadeaway = false;
		this.SetState(this._state.Normal);
		this.SetId(id);

		this.delay_blink = new Delay(0, 2);
		this.delay_waittofade = new Delay(0, 200);
		this.delay_fadeaway = new Delay(0, 100);
		return;
	}

	this.Destroy = function() {

		this.state = this._state.Purge;	
	
		this.x = 0; this.y = 0;
		this.w = 0; this.h = 0;

		this.id = 0; this.offset_x = 0;
		this.offset_y = 0; this.total = 0;

		this.burst = null; this.handle = null;

		return;
	}

	this.InBoundPlayable = function(playable) {

		if (playable.state == this._state.Purge)
			return false;
		if (playable.state == this._state.Burst)
			return false;

		if (this.state == this._state.Purge)
			return false;

		if (playable.InBound(new Rectangle(this.x+this.offset_x,
			this.y+this.offset_y, this.w, this.h)) == true) {

			this.hud_manager.SetConsumable(this.id, this.total);

			playable.projectile_burst.Create();
			playable.projectile_burst.SetPoint(this.x, this.y);
			playable.SetState(this._state.Collect);

			this.SetState(this._state.Purge);
			return true;
		}

		return false;
	}

	this.SetId = function(id) {

		if (id == this._consumable.None) {
			this.SetState(this._state.Purge);
			return;
		}

		this.id = id;
		this.handle = this.hud_manager.handle[id];

		return;
	}

	this.Update = function() {

		if (this.state == this._state.Purge)
			return;
		if (this.state == this._state.FadeAway)
			if (this.delay_fadeaway.Process() == false) {
				this.SetState(this._state.Purge);
				return;
		}
		

		if (this.flag_fadeaway == true)

			if (this.delay_waittofade.Process() == false) {
				this.SetState(this._state.FadeAway);
				return;
		}

		if (this.InBoundPlayable(this.playable) == true)
			return;

		this.Draw();
		return;
	}

	this.Draw = function() {

		if (this.state == this._state.FadeAway)
			if (this.delay_blink.Process() == true)
				return;

		this.display_manager.drawImage(this.handle, this.x, this.y);
		return;
	}
}
