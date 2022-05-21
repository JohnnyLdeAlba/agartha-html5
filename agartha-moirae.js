function less_than(x, y) {
	if (x < y) return true;
	return false; }

function greater_than(x, y) {
	if (x > y) return true;
	return false; }

function not_equal(x, y) {
	if (x != y) return true;
	return false; }

function equals(x, y) {
	if (x == y) return true;
	return false; }

function Delay(count, total) {

	this.count = count;
	this.total = total;

	this.Process = function() {

		if (this.count == this.total) this.count = 0;
		else { this.count++; return true; }

		return false;
	}
}

function Rectangle(x, y, w, h) {

	this.x = x; this.y = y;
	this.w = w; this.h = h;

	this.setRectangle = function(x, y, w, h) {

		this.x = x; this.y = y;
		this.w = w; this.h = h;
		return;
	}

	this.getRectangle = function()
		{ return new Rectangle(this.x, this.y, this.w, this.h); }

}

function InBound(current, boundary) {

	if (less_than(current.x+current.w, boundary.x) ||
		greater_than(current.x, boundary.x+boundary.w))
			return false;

	else if (less_than(current.y+current.h, boundary.y) ||
		greater_than(current.y, boundary.y+boundary.h))
			return false;
			
	return true;
}

function InBoundX(current, next, boundary) {

	if (less_than(next.x+current.w, boundary.x) ||
		greater_than(next.x, boundary.x+boundary.w)) 
			return false;
	else if (less_than(current.y+current.h, boundary.y) ||
		greater_than(current.y, boundary.y+boundary.h))
			return false;
			
	return true;
}
	
function InBoundY(current, next, boundary) {

	if (less_than(next.y+current.h, boundary.y) ||
		greater_than(next.y, boundary.y+boundary.h)) 
			return false;

	else if (less_than(current.x+current.w, boundary.x) ||
		greater_than(current.x, boundary.x+boundary.w))
			return false;
			
	return true;
}	
	
function FillRect(x, y, w, h, color) {

		display.logical_display.fillStyle = color; 
		display.logical_display.fillRect(x, y, w, h);
}

function StrokeRect(x, y, w, h, color) {

		display.logical_display.strokeStyle = color; 
		display.logical_display.strokeRect(x, y, w, h);
}

function _core_method_inboundplayablelaser(playable) {

	if (playable.state == playable._state.Purge)
		return false;
	if (playable.state == playable._state.Burst)
		return false;

	if (this.projectile_laser.state == this.projectile_laser._state.Purge)
		return false;

	if (this.state == this._state.Purge)
		return false;
	if (this.state == this._state.Burst)
		return false;

	if (this.projectile_laser.InBound(playable.current) == true) {

		if (not_equal(playable.projectile_shield.state, this._state.Purge))
			playable.SetShieldHealth(playable.projectile_shield.health-1);
		else playable.SetHealth(playable.health-1);

		return true;
	}

	return false;
}

function _core_method_sethudmanager(hud_manager) {

	this.hud_manager = hud_manager;
	return;
}

function _core_method_setplayable(playable) {

	this.playable = playable;
	return;
}

var display = null;

function _core_displaymanager() {

	this.playable = null;
	this.viewport_manager = null;

	this.physical_display = null;
	this.logical_display = null;

	this.handle = null;
	this.skip_frame = false;

	this.Create = function() {

		this.viewport_manager = this.playable.viewport_manager;

		this.handle = document.createElement('canvas');
		this.handle.width = 320; this.handle.height = 240;

		this.physical_display = document.getElementById('viewport').getContext('2d');
		this.logical_display = this.handle.getContext('2d');

		this.logical_display.beginPath();
		this.logical_display.rect(0, 0, 320, 240);
		this.logical_display.clip();

		this.skip_frame = false;
	}

	this.GetDisplay = function() { return this.logical_display; }

	this.fillRect = function(x, y, w, h) {

		var object = this.viewport_manager.TranslateToViewport(new Rectangle(x, y, 0, 0));
		this.logical_display.fillRect(object.x, object.y, object.x+w, object.y+h);
	}

	this.StrokeRect = function(x, y, w, h, color) {

		var current = this.viewport_manager.TranslateToViewport(new Rectangle(x, y, 0, 0));

		this.logical_display.strokeStyle = color;
		this.logical_display.strokeRect(current.x, current.y, w , h);
	}

	this.drawImage = function(handle, x, y) {

		var current = this.viewport_manager.TranslateToViewport(new Rectangle(x, y, 20, 20));

		this.logical_display.drawImage(handle, current.x, current.y);
		return;
	}

	this.Draw = function() {

		if (this.skip_frame == true) {
			this.skip_frame = false; return;
		} else this.skip_frame = true;

		this.physical_display.clearRect(0, 0, 320, 240);
		this.physical_display.drawImage(this.handle, 0, 0);
		this.logical_display.clearRect(0, 0, 320, 240);
		return;
	}
}

var keyboard = new function () {

	this.up = false; this.down = false;
	this.left = false; this.right = false;
	this.enter = false; this.i = false;
	this.j = false; this.k = false; this.l = false;

	this.KeyState = function(keyDown, event) {

		if (event.which == '13') this.enter = keyDown;

		if (event.which == '73') this.i = keyDown;
		if (event.which == '74') this.j = keyDown;
		if (event.which == '75') this.k = keyDown;
		if (event.which == '76') this.l = keyDown;

		if (event.which == '65') this.left = keyDown;
		if (event.which == '87') this.up = keyDown;
		if (event.which == '68') this.right = keyDown;
		if (event.which == '83') this.down = keyDown;

		return;
	}

	$(document).keyup(function(event) {
		keyboard.KeyState(false, event); return; });

	$(document).keydown(function(event) {
		keyboard.KeyState(true, event); return; });
}

var jukebox = new function() {

	this.play = function(id) {

		var data = "<object type='application\/x-shockwave-flash'"
			+" data='player.swf' height='1' width='1'>"
		+"<param name='movie' value='player.swf'>"
		+"<param name='FlashVars' value='playerID=1&amp;"
			+"autostart=yes&amp;loop=yes&amp;"
			+"soundFile=agartha\/"+id+"'>"
		+"<\/object>";

		$('#jukebox').html(data);

		return;
	}

	this.stop = function() { $('#jukebox').html(''); return; }
}
function _core_viewportmanager() {

	this.playable = null;

	this.x = 30; this.y = 30;
	this.w = 0; this.h = 0;
	this.WorldWidth = 0; this.WorldHeight = 0;
	this.preceding = null;

	this.SetPoint = function(x, y) { this.x = x; this.y = y; return; }

	this.Create = function() {
	
		this.x = 0; this.y = 0;
		this.w = 320; this.h = 240;

		this.WorldWidth = 0; this.WorldHeight = 0;
		this.preceding = new Rectangle(0, 0, 0, 0);
	}

	this.SetWorldSize = function(w, h) {
		
		this.WorldWidth = w;
		this.WorldHeight = h;
	}
	
	this.SetPlayable = function(playable) {
	
		this.playable = playable;
	}
	
	this.xUpdate = function() {

		var Center = this.x+(this.w/2);
		
		// LEFT
		if (this.playable.x < this.preceding.x) {
			if ((this.x > 0) && (this.playable.x+this.playable.w <= Center))
					this.x+= (this.playable.x-this.preceding.x);
		}
		else if (this.playable.x > this.preceding.x) {
			if ((this.x+this.w < this.WorldWidth) && (this.playable.x >= Center))
					this.x+= (this.playable.x-this.preceding.x);
		}
		
		if (this.x < 0) this.x = 0;
		else if (this.x+this.w > this.WorldWidth)
			this.x = this.WorldWidth-this.w;

		this.preceding.x = this.playable.x;
	}

	this.yUpdate = function() {

		var Center = this.y+(this.h/2);

		// UP
		if (this.playable.y < this.preceding.y) {
			if ((this.y > 0) && ((this.playable.y+this.playable.h) <= Center))
					this.y+= (this.playable.y-this.preceding.y);
		}
		else if (this.playable.y > this.y) {
			if ((this.y+this.h < this.WorldHeight) && (this.playable.y >= Center))
					this.y+= (this.playable.y-this.preceding.y);
		}
		
		if (this.y < 0) this.y = 0;
		else if (this.y+this.h > this.WorldHeight)
			this.y = this.WorldHeight-this.h;

		this.preceding.y = this.playable.y;
	}

	this.UpdatePosition = function() {

		if (this.playable.state == this.playable._state.Purge)
			return false;
		if (this.playable.state == this.playable._state.Burst)
			return false;

		this.xUpdate();
		this.yUpdate();
	}

	this.GetBoundary = function() {

		return (new Rectangle(this.x, this.y, this.w, this.h));
	}

	this.InBound = function(boundary) {

		if (InBound(boundary, new Rectangle(this.x, this.y,
			this.w, this.h)) == true) return true;

		return false;
	}

	this.TranslateToViewport = function(current) {

		return (new Rectangle(current.x-this.x, current.y-this.y));
	}
}
function _core_consumable() {

	var count = 0;

	this.AirJar = count;
	this.HealthJar = ++count;
	this.Bomb = ++count;
	this.MegaBomb = ++count;
	this.Laser = ++count;
	this.Shield = ++count;
	this.Coin = ++count;

	this.None = ++count;
}

function _core_hudmanager() {

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

	this.delay_message = null;
	this.instruction_hidemessage = false;
	
	this.Create = function() {

		this.display_manager = this.playable.display_manager;
		this.logical_display = this.display_manager.logical_display;
		this.keyboard = keyboard;

		this.total = 6;
		this.inventory = new Array(this.total+1);

		for (var count = 0; count < this.total+1; count++)
			this.inventory[count] = 5;

		this.LoadImage();
		this.LoadText();
		this.LoadWindow();
		
		this.blink_airmeter = false;
		this.delay_airmeter = new Delay(0, 30);
		this.delay_message = new Delay(0, 600);
		this.instruction_hidemessage = false;

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
		this.text[++count] = 'COIN';

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

	this.PrintMessage = function(text) {

		text = "<p style='font-weight: bold; text-decoration: underline;'>MESSAGE</p>"+text;

		$('#message').html(text);

		this.delay_message.count = 0;
		this.instruction_hidemessage = true;
		return;
	}

	this.ProcessInstruction = function() {

		if (this.instruction_hidemessage == true)
			if (this.delay_message.Process() == false) {
				$('#message').html('');
				this.instruction_hidemessage = false;
		}

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

		this.SetState(this._state.Normal);
		this.SetId(id);
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
		if (this.InBoundPlayable(this.playable) == true)
			return;

		this.Draw();
		return;
	}

	this.Draw = function() {

		this.display_manager.drawImage(this.handle, this.x, this.y);
		return;
	}
}

function _cpu_airplant_draw() {

	this.display_manager.drawImage(this.handle, this.x, this.y);
	return;
}

function _cpu_airplant_inboundplayable(playable) {

	if (this.bubble.InBoundPlayable(playable) == true)
		return true;

	return false;
}

function _cpu_airplant_inboundsonar(playable) {

	if (playable.state == this._state.Purge)
		return false;
	if (playable.state == this._state.Burst)
		return false;

	if (playable.projectile_sonar.state == this._state.Purge)
		return false;
	if (this.state == this._state.Purge)
		return false;

	this.current = new Rectangle(this.x+this.offset_x,
		this.y+this.offset_y, this.w, this.h);

	if (playable.projectile_sonar.InBound(this.current) == true) {

		playable.projectile_sonar.SetState(this._state.Purge);
		if (playable.breath >= 3) return false;

		if (this.bubble.state == this._state.Purge) {

			this.bubble.Create();
			this.bubble.SetPoint(this.x, this.y-12);
			this.SetState(this._state.Bubble);
		}

		return true;
	}

	return false;
}

function _cpu_airplant_inbound(boundary) {

	if (InBound(this.current, boundary) == true)
		return true;
			
	return false;
}

function _cpu_airplant_update() {

	if (this.state == this._state.Purge)
		return;
	if (this.state == this._state.Bubble)
		this.bubble.Update();

	if (this.InBound(this.viewport_manager.GetBoundary()) == false)
		return true;

	this.InBoundPlayable(this.playable);
	this.InBoundSonar(this.playable);

	this.Draw();		
	return;
}

function _cpu_airplant_setcolor(color) {

	this.handle = new Image();

	switch (color) {

		case 'orange': this.handle.src = 'agartha/airplant-2.png'; break;
		default:  this.handle.src = 'agartha/airplant-1.png'; break;
	}

	return;
}

function _cpu_airplant_create() {

	this.display_manager = this.playable.display_manager;
	this.viewport_manager = this.playable.viewport_manager;
	this.hud_manager = this.playable.hud_manager;

	// constant:
	this.w = 10; this.h = 10;
	this.offset_x = 7; this.offset_y = 7;

	// initial:
	this.index = 0; this.direction = 0;
	this.SetPoint(0, 0);
		
	// assign:
	this.bubble = new _projectile_bubble();
	this.bubble.playable = this.playable;
	this.bubble.LoadImage();

	this.current = new Rectangle(0, 0, 0, 0);

	this.SetState(this._state.Normal);
	return;
}

function _cpu_airplant_destroy() {

	this.state = this._state.Purge;	
	
	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;

	this.index = 0;
	this.offset_x = 0; this.offset_y = 0;

	this.bubble = null; this.current = null;
	this.handle = null;

	return;
}

function _cpu_airplant() {

	this._consumable = new _core_consumable();
	this._state = new _core_state();

	this.playable = null;
	this.display_manager = null;
	this.viewport_manager = null;
	this.hud_manager = null;

	this.state = this._state.Purge;	
	
	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;

	this.id = 0; this.index = 0;
	this.offset_x = 0; this.offset_y = 0;

	this.bubble = null; this.handle = null;

	this.set_playable = _core_method_setplayable;

	this.Create = _cpu_airplant_create;
	this.Destroy = _cpu_airplant_destroy;

	this.SetState = _core_method_setstate;
	this.SetPoint = _core_method_setpoint;
	this.SetColor = _cpu_airplant_setcolor;

	this.Draw = _cpu_airplant_draw;
	this.InBound = _cpu_airplant_inbound;
	this.InBoundPlayable = _cpu_airplant_inboundplayable;
	this.InBoundSonar = _cpu_airplant_inboundsonar;
	this.Update = _cpu_airplant_update;
}

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

	this.state = this._state.Purge;

	this.flag_hunt = false;
	this.flag_hostile = false;

	this.direction = this._direction.Left; 
	this.health = 0;
	
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
	this.InBoundBomb = _core_method_inboundbomb;
	this.InBoundLaser = _core_method_inboundlaser;
	this.InBoundPlayable = _core_method_inboundplayable;
	this.InBoundSonar = _core_method_inboundsonar;

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
		this.health = 0;
	
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

		this.flag_hunt = false;
		this.flag_hostile = true;

		this.SetDirection(this._direction.Right);

		this.health = 6;
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

		this.InBoundPlayable(this.playable);
		this.InBoundBomb(this.playable);
		this.InBoundLaser(this.playable);
		this.InBoundSonar(this.playable);

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

function _core_state() {

	var count = 0;

	this.Purge = count;
	this.Normal = ++count;
	this.Damage = ++count;
	this.Burst = ++count;
	this.Consumable = ++count;

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

function _core_method_inboundplayable(playable) {

	if (playable.state == this._state.Purge)
		return false;
	if (playable.state == this._state.Burst)
		return false;
	if (playable.state == this._state.Damage)
		return false;
	if (this.state == this._state.Purge)
		return false;

	if (playable.InBoundX(this.current))
		playable.outbound_x = false;
	if (playable.InBoundY(this.current))
		playable.outbound_y = false;

	if (playable.InBound(this.current) == true) {

		if (not_equal(playable.projectile_shield.state, this._state.Purge))
			playable.SetShieldHealth(playable.projectile_shield.health-1);

		else playable.SetHealth(playable.health-1);

		return true;
	}

	return false;
}

function _core_method_inboundbomb(playable) {

	if (playable.state == this._state.Purge)
		return false;
	if (playable.state == this._state.Burst)
		return false;

	if (playable.projectile_bomb.state == this._state.Purge)
		return false;
	if (playable.projectile_bomb.state == this._state.Normal)
		return false;

	if (this.state == this._state.Purge)
		return false;
	if (this.state == this._state.Burst)
		return false;

	if (playable.projectile_bomb.InBound(this.current) == true) {

		this.SetHealth(this.health-10);
		return true;
	}

	return false;
}

function _core_method_inboundlaser(playable) {

	if (playable.state == this._state.Purge)
		return false;
	if (playable.state == this._state.Burst)
		return false;

	if (playable.projectile_laser.state == this._state.Purge)
		return false;

	if (this.state == this._state.Purge)
		return false;
	if (this.state == this._state.Burst)
		return false;

	if (playable.projectile_laser.InBound(this.current) == true) {

		this.SetHealth(this.health-10);
		return true;
	}

	return false;
}

function _core_method_inboundsonar(playable) {

	if (playable.state == this._state.Purge)
		return false;
	if (playable.state == this._state.Burst)
		return false;

	if (playable.projectile_sonar.state == this._state.Purge)
		return false;

	if (this.state == this._state.Purge)
		return false;
	if (this.state == this._state.Burst)
		return false;

	if (playable.projectile_sonar.InBound(this.current) == true) {

		playable.projectile_sonar.SetState(this._state.Purge);
		this.SetHealth(this.health-1);

		return true;
	}

	return false;
}

function _core_method_sethealth(health) {

	if (this.state == this._state.Damage)
		return;

	this.health = health;
	if (this.health > 0) {

		this.SetState(this._state.Damage);
		return;
	}

	this.projectile_burst.Create();
	this.projectile_burst.SetPoint(this.x+(this.image_w-24)/2,
		this.y+(this.image_w-24)/2);

	this.SetState(this._state.Burst);

	return;
}

function _cpu_bluejelly() {

	this._state = new _core_state();
	this._consumable = new _core_consumable();

	this.playable = null;
	this.display_manager = null;
	this.viewport_manager = null;

	this._core_method_setpoint = _core_method_setpoint;

	this.SetState = _core_method_setstate;
	this.SetHealth = _core_method_sethealth;
	this.UpdateState = _core_method_updatestate;

	this.InBound = _core_method_inbound;
	this.InBoundPlayable = _core_method_inboundplayable;
	this.InBoundBomb = _core_method_inboundbomb;
	this.InBoundLaser = _core_method_inboundlaser;
	this.InBoundSonar = _core_method_inboundsonar;

	this.state = this._state.Purge;

	this.health = 0; 

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

		this.health = 0; 

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

		this.health = 3;

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

		this.InBoundPlayable(this.playable);
		this.InBoundBomb(this.playable);
		this.InBoundLaser(this.playable);
		this.InBoundSonar(this.playable);

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

function _cpu_darkorca_loadimage() {

	var count = 0; var total = 18;

	this.handle = new Array(total);
	for (; count < total; count++)
		this.handle[count] = new Image();

	count = 0;
	this.handle[count].src = 'agartha/darkorca-left-1.png';
	this.handle[++count].src = 'agartha/darkorca-left-2.png';
	this.handle[++count].src = 'agartha/darkorca-left-3.png';
	this.handle[++count].src = 'agartha/darkorca-left-4.png';
	this.handle[++count].src = 'agartha/darkorca-left-5.png';

	this.handle[++count].src = 'agartha/darkorca-right-1.png'; 
	this.handle[++count].src = 'agartha/darkorca-right-2.png';
	this.handle[++count].src = 'agartha/darkorca-right-3.png';
	this.handle[++count].src = 'agartha/darkorca-right-4.png';
	this.handle[++count].src = 'agartha/darkorca-right-5.png';

	this.handle[++count].src = 'agartha/darkorca-up-4.png';
	this.handle[++count].src = 'agartha/darkorca-up-2.png';
	this.handle[++count].src = 'agartha/darkorca-up-3.png';
	this.handle[++count].src = 'agartha/darkorca-up-4.png';

	this.handle[++count].src = 'agartha/darkorca-down-4.png';
	this.handle[++count].src = 'agartha/darkorca-down-2.png';
	this.handle[++count].src = 'agartha/darkorca-down-3.png';
	this.handle[++count].src = 'agartha/darkorca-down-4.png';

	return;
}

function _cpu_darkorca_create() {

	this._cpu_darkorca_loadimage();
	this.Create();

	return;
}

function _cpu_orca_loadimage() {

	var count = 0; var total = 18;

	this.handle = new Array(total);
	for (; count < total; count++)
		this.handle[count] = new Image();

	count = 0;
	this.handle[count].src = 'agartha/orca-left-1.png';
	this.handle[++count].src = 'agartha/orca-left-2.png';
	this.handle[++count].src = 'agartha/orca-left-3.png';
	this.handle[++count].src = 'agartha/orca-left-4.png';
	this.handle[++count].src = 'agartha/orca-left-5.png';

	this.handle[++count].src = 'agartha/orca-right-1.png'; 
	this.handle[++count].src = 'agartha/orca-right-2.png';
	this.handle[++count].src = 'agartha/orca-right-3.png';
	this.handle[++count].src = 'agartha/orca-right-4.png';
	this.handle[++count].src = 'agartha/orca-right-5.png';

	this.handle[++count].src = 'agartha/orca-up-4.png';
	this.handle[++count].src = 'agartha/orca-up-2.png';
	this.handle[++count].src = 'agartha/orca-up-3.png';
	this.handle[++count].src = 'agartha/orca-up-4.png';

	this.handle[++count].src = 'agartha/orca-down-4.png';
	this.handle[++count].src = 'agartha/orca-down-2.png';
	this.handle[++count].src = 'agartha/orca-down-3.png';
	this.handle[++count].src = 'agartha/orca-down-4.png';

	return;
}

function _cpu_orca_create() {

	this._cpu_orca_loadimage();
	this.Create();

	return;
}

function _cpu_dolphin_inboundspeak(playable) {

	if (playable.state == playable._state.Purge)
		return false;
	if (playable.state == playable._state.Burst)
		return false;

	if (playable.projectile_sonar.state == playable.projectile_sonar._state.Purge)
		return false;

	if (this.state == this._state.Purge)
		return false;

	this.current = new Rectangle(this.x+this.offset_x,
		this.y+this.offset_y, this.w, this.h);

	if (playable.projectile_sonar.InBound(this.current) == true) {

		playable.projectile_sonar.SetState(playable.projectile_sonar._state.Purge);
		this.hud_manager.DispatchMessage(this.text);
		this.SetState(this._state.Hologram);
	}

	return true;
}

function _cpu_dolphin_inbound(boundry) {

	if (InBound(this.current, boundry) == true)
		return true;
			
	return false;
}

function _cpu_dolphin_setdirection(direction) {

	if (this.direction == direction)
		return;

	this.direction = direction;
	this.SetStartFrame(this.direction);
	return;
}

function _cpu_dolphin_setdefaultframe(direction) {

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

function _cpu_dolphin_setstartframe(direction) {

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

function _cpu_dolphin_loadimage() {

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

function _cpu_dolphin_frameset(start, stop) {

	if ((this.index < start) || (this.index > stop))
		this.index = start;
	else this.index++;

	return;
}

function _cpu_dolphin_updateframe() {

	if (this.delay_flip.Process() == true)
		return false;

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

function _cpu_dolphin_draw() {

	if (this.state == this._state.Damage)
		if (this.delay_flip.Process() == true) return;

	display.drawImage(this.handle[this.index],
		this.x, this.y);

	return;
}

function _cpu_dolphin_sethealth(health) {

	if (this._core_method_sethealth(health) == false) {
		this.next.setRectangle(0, 0, 0, 0);
		return false;
	}

	return true;
}

function _cpu_dolphin_updatehunt() {

	if (this.flag_hostile == false) return false;

	if (this.playable.state == this.playable._state.Purge)
		return false;
	if (this.playable.state == this.playable._state.Burst)
		return false;

	if (this.delay_hunt.Process() == false)
		this.SetState(this._state.Hunt);

	if (not_equal(this.state, this._state.Hunt))
		return false;

	if (this.y < this.playable.y)
		this.SetDirection(this._direction.Down);

	else if (this.y > this.playable.y)
		this.SetDirection(this._direction.Up);

	if (this.x < this.playable.x)
		this.SetDirection(this._direction.Right);

	else if (this.x > this.playable.x)
		this.SetDirection(this._direction.Left);

	if (this.delay_move.Process() == true)
		return;

	if (this.x > this.playable.x) this.x--;
		else if (this.x < this.playable.x) this.x++;

	if (this.y > this.playable.y) this.y--;
		else if (this.y < this.playable.y) this.y++;

	if (this.playable.InBound(this.current) == true)
		this.SetState(this._state.Normal);

	return true;
}

function _cpu_dolphin_updatepoint() {

	if (this.next == null) {
		this.SetDefaultFrame(this.direction);
		return;
	}

	if (this.InBound(this.next[this.next_point]) == true) {

		this.next_point++;
		if (this.next_point >= this.next.length)
			this.next_point = 0;
	}

	if (this.x < this.next[this.next_point].x)
		this.SetDirection(this._direction.Right);

	else if (this.x > this.next[this.next_point].x)
		this.SetDirection(this._direction.Left);

	if (this.y < this.next[this.next_point].y)
		this.SetDirection(this._direction.Down);

	else if (this.y > this.next[this.next_point].y)
		this.SetDirection(this._direction.Up);

	if (this.delay_move.Process() == true)
		return;

	if (this.x > this.next[this.next_point].x) this.x--;
		else if (this.x < this.next[this.next_point].x) this.x++;

	if (this.y > this.next[this.next_point].y) this.y--;
		else if (this.y < this.next[this.next_point].y) this.y++;

	return;
}

function _cpu_dolphin_processstate() {

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
	}
}

function _cpu_dolphin_process() {

	if (this.ProcessState() == true)
			return;

	if (this.InBound(this.viewport_manager.GetBoundary()) == false)
		return true;

	this.UpdateFrame();
	if (this.UpdateHunt() == false)
		this.UpdatePoint();

	this.current = new Rectangle(this.x+this.offset_x,
		this.y+this.offset_y, this.w, this.h);

	if (this.flag_hostile == true) {

		this.InBoundPlayable(this.playable);
		this.InBoundBomb(this.playable);
		this.InBoundLaser(this.playable);
		this.InBoundSonar(this.playable);

	} else this.InBoundSpeak(this.playable);

	this.Draw();
	return;
}

function _cpu_dolphin_create() {

	this.display_manager = this.playable.display_manager;
	this.viewport_manager = this.playable.viewport_manager;
	this.hud_manager = this.playable.hud_manager;

	this.SetPoint(0, 0);
	this.w = 12; this.h = 12; this.image_w = 48;
	this.offset_x = 18; this.offset_y = 18;
	this.flag_hostile = false;

	this.index = 0;
	this.current = new Rectangle(0, 0, 0, 0);
	this.next = null; this.next_point = 0;
	this.health = 10;
	this.delay_flip = new Delay(0, 8);
	this.delay_move = new Delay(0, 2);
	this.delay_damage = new Delay(0, 30);
	this.delay_hunt = new Delay(0, 400);
	this.text = '';

	if (this.handle == null) this.LoadImage();

	this.projectile_burst = new _projectile_burst();
	this.projectile_burst.LoadImage();

	this.SetState(this._state.Normal);
	this.SetDirection(this._direction.Left);

	return;
} 

function _cpu_dolphin_destroy() {

	this.state = this._state.Purge;
	this.direction = this._direction.Left;
	this.flag_hostile = false;

	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;
	this.image_w = 0;
	this.health = 0;
	this.current = null; this.next = null;
	this.next_point = 0;
	this.offset_x = 0; this.offset_y = 0;

	this.index = 0;
	this.handle = null;
	this.delay_flip = null;
	this.delay_move = null;
	this.text = null;
	
	return;
}

function _cpu_dolphin() {

	this._core_method_sethealth = _core_method_sethealth;

	this._cpu_darkorca_loadimage = _cpu_darkorca_loadimage;
	this._cpu_darkorca_create = _cpu_darkorca_create;
	this._cpu_orca_loadimage = _cpu_orca_loadimage;
	this._cpu_orca_create = _cpu_orca_create;

	this.playable = null;
	this.display_manager = null;
	this.viewport_manager = null;
	this.hud_manager = null;

	this._state = new _core_state();
	this._direction = new _core_direction();
	this._consumable = new _core_consumable();
	this.flag_hostile = false;

	this.playable = null;
	this.hud_manager = null;

	this.state = this._state.Purge;
	this.direction = this._direction.Left;

	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;
	this.image_w = 0;

	this.current = null; this.next = null;
	this.next_point = 0;
	this.offset_x = 0; this.offset_y = 0;

	this.index = 0;
	this.handle = null;
	this.delay_flip = null;
	this.delay_move = null;
	this.text = null;

	this.set_playable = _core_method_setplayable;
	this.set_hudmanager = _core_method_sethudmanager;

	this.SetState = _core_method_setstate;
	this.SetPoint = _core_method_setpoint;
	this.SetHealth = _core_method_sethealth;

	this.Create = _cpu_dolphin_create;
	this.Destroy = _cpu_dolphin_destroy;

	this.InBound = _cpu_dolphin_inbound;
	this.InBoundSpeak = _cpu_dolphin_inboundspeak;
	this.InBoundBomb = _core_method_inboundbomb;
	this.InBoundLaser = _core_method_inboundlaser;
	this.InBoundPlayable = _core_method_inboundplayable;
	this.InBoundSonar = _core_method_inboundsonar;

	this.SetDirection = _cpu_dolphin_setdirection;
	this.LoadImage = _cpu_dolphin_loadimage;
	this.SetDefaultFrame = _cpu_dolphin_setstartframe;
	this.SetStartFrame = _cpu_dolphin_setstartframe;
	this.FrameSet = _cpu_dolphin_frameset;
	this.UpdateFrame = _cpu_dolphin_updateframe;
	this.Draw = _cpu_dolphin_draw;

	this.UpdateHunt = _cpu_dolphin_updatehunt;
	this.UpdatePoint = _cpu_dolphin_updatepoint;
	
	this.ProcessState = _cpu_dolphin_processstate;
	this.Process = _cpu_dolphin_process;
}

function _cpu_glyph_draw() {

	this.display_manager.drawImage(this.handle[0], this.x, this.y);
	return;
}

function _cpu_glyph_inbound(boundary) {

	if (InBound(this.current, boundary) == true)
		return true;
			
	return false;
}

function _cpu_glyph_drawhologram() {

	if (this.delay_blink.Process() == false)
		return

	this.display_manager.drawImage(this.handle[this.index], this.hologram_x, this.hologram_y);

	return;
}

function _cpu_glyph_inboundsonar(playable) {

	if (playable.state == this._state.Purge)
		return false;
	if (playable.state == this._state.Burst)
		return false;

	if (playable.projectile_sonar.state == this._state.Purge)
		return false;

	if (this.state == this._state.Purge)
		return false;

	this.current = new Rectangle(this.x+this.offset_x,
		this.y+this.offset_y, this.w, this.h);

	if (playable.projectile_sonar.InBound(this.current) == true) {

		playable.projectile_sonar.SetState(this._state.Purge);

		if (this.state == this._state.Hologram)
			return false;
		
		this.hud_manager.DispatchMessage(this.text);
		this.SetState(this._state.Hologram);
	}

	return true;
}

function _cpu_glyph_process() {

	if (this.state == this._state.Purge)
		return;


	if (this.InBound(this.viewport_manager.GetBoundary()) == false)
		return true;

	if (this.state == this._state.Hologram) {

		if (this.delay_hologram.Process() == false)
			this.SetState(this._state.Normal);

		this.DrawHologram();
	}

	this.InBoundSonar(this.playable);
	this.Draw();		
	return;
}

function _cpu_glyph_setdirection(direction) {

	this.direction = direction;

	switch (this.direction) {

		case this._direction.Left:
			this.index = 1;
			this.hologram_x = this.x-48;
			this.hologram_y = this.y;
				break;

		case this._direction.Right:
			this.index = 2;
			this.hologram_x = this.x+24;
			this.hologram_y = this.y;
				break;
	}

	return;
}

function _cpu_glyph_setid(id) {

	this.handle = new Array(3);
	this.handle[0] = new Image();
	this.handle[1] = new Image();
	this.handle[2] = new Image();

	switch (id) {

		case 'hercules': {
			this.handle[0].src = 'agartha/crystal-2.png';
			this.handle[1].src = 'agartha/hercules-left-1.png';
			this.handle[2].src = 'agartha/hercules-right-1.png';
			break; }

		default: {
			this.handle[0].src = 'agartha/crystal-1.png';
			this.handle[1].src = 'agartha/nalia-left-1.png';
			this.handle[2].src = 'agartha/nalia-right-1.png';
			break; }
	}

	return;
}

function _cpu_glyph_create() {

	this.display_manager = this.playable.display_manager;
	this.viewport_manager = this.playable.viewport_manager;
	this.hud_manager = this.playable.hud_manager;

	// constant:
	this.w = 10; this.h = 10;
	this.offset_x = 7; this.offset_y = 7;

	// initial:
	this.index = 0; this.hologram_x = 0;
	this.hologram_y = 0; this.text = null;

	this.SetPoint(0, 0);
		
	// assign:

	this.current = new Rectangle(0, 0, 0, 0);
	this.delay_blink = new Delay(0, 4);
	this.delay_hologram = new Delay(0, 400);

	this.SetState(this._state.Normal);
	return;
}

function _cpu_glyph_destroy() {

	this.state = this._state.Purge;	
	
	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;

	this.index = 0; this.hologram_x = 0;
	this.hologram_y = 0; this.offset_x = 0;
	this.offset_y = 0;

	this.current = null; this.delay_blink = null;
	this.delay_hologram = null; this.handle = null;
	this.text = null;

	return;
}

function _cpu_glyph() {

	this._consumable = new _core_consumable();
	this._direction = new _core_direction();
	this._state = new _core_state();

	this.playable = null;
	this.display_manager = null;
	this.viewport_manager = null;

	this.state = this._state.Purge;	
	
	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;

	this.index = 0; this.hologram_x = 0;
	this.hologram_y = 0; this.offset_x = 0;
	this.offset_y = 0;

	this.current = null; this.delay_blink = null;
	this.delay_hologram = null; this.handle = null;
	this.text = null;

	this.Create = _cpu_glyph_create;
	this.Destroy = _cpu_glyph_destroy;

	this.SetState = _core_method_setstate;
	this.set_playable = _core_method_setplayable;
	this.set_hudmanager = _core_method_sethudmanager;
	this.SetPoint = _core_method_setpoint;

	this.Draw = _cpu_glyph_draw;
	this.DrawHologram = _cpu_glyph_drawhologram;
	this.InBound = _cpu_glyph_inbound;
	this.InBoundSonar = _cpu_glyph_inboundsonar;
	this.Process = _cpu_glyph_process;
	this.SetDirection = _cpu_glyph_setdirection;
	this.SetId = _cpu_glyph_setid;
}


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

function _cpu_moirae_inboundplayable(playable) {

	this._core_method_inboundplayable(playable);
	this.InBoundPlayableLaser(playable);
	
	return true;	
}

function _cpu_moirae() {

	this._core_method_inboundplayable = _core_method_inboundplayable;

	this._state = new _core_state();
	this._direction = new _core_direction();

	this.playable = null;
	this.display_manager = null;
	this.viewport_manager = null;

	this.SetState = _core_method_setstate;
	this.SetPoint = _core_method_setpoint;
	this.SetHealth = _core_method_sethealth;

	this.InBound = _core_method_inbound;
	this.InBoundBomb = _core_method_inboundbomb;
	this.InBoundLaser = _core_method_inboundlaser;
	this.InBoundSonar = _core_method_inboundsonar;

	this.state = this._state.Purge;
	
	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;

	this.direction = 0; this.health = 0;
	this.index = 0; this.image_w = 0;
	this.offset_x = 0; this.offset_y = 0;

	this.boundary = null; this.projectile_burst = null;
	this.current = null; this.handle = null;
	this.restricted_boundary = null;
	this.projectile_laser = null; this.left_jab = false;
	
	this.delay_flip = null; this.delay_move = null;
	this.delay_damage = null;

	this.InBoundPlayable = _cpu_moirae_inboundplayable;
	this.InBoundPlayableLaser = _core_method_inboundplayablelaser;

	this.CreateLaser = _cpu_moirae_createlaser;
	this.UpdatePoint = _cpu_moirae_updatepoint;

	this.Create = function() {

		this.display_manager = this.playable.display_manager;
		this.viewport_manager = this.playable.viewport_manager;

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

		this.health = 26;
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

		this.InBoundPlayable(this.playable);
		this.InBoundBomb(this.playable);
		this.InBoundLaser(this.playable);
		this.InBoundSonar(this.playable);

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

		this.direction = 0; this.health = 0;
		this.index = 0; this.image_w = 0;
		this.offset_x = 0; this.offset_y = 0;

		this.boundary = null; this.projectile_burst = null;
		this.current = null; this.handle = null;
	
		this.delay_flip = null; this.delay_move = null;
		this.delay_damage = null;

		return;
	}
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
		case this._consumable.Laser: this.CreateLaser(); break;
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

	if (this.projectile_shield.state != this.projectile_laser._state.Purge)
		return;

	if (this.hud_manager.inventory[this._consumable.Shield] <= 0) return;

	this.breath = 3;
	this.projectile_shield.Create();
	this.hud_manager.SetConsumable(this._consumable.Shield, -1);
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

	this.projectile_bomb.InBoundPlayable(this);
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

	if (this.outbound_x) this.x = this.next.x-this.offset_x;
	if (this.outbound_y) this.y = this.next.y-this.offset_y;

	this.projectile_bomb.Process();
	this.projectile_laser.Process();
	this.projectile_sonar.Process();

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
	this.delay_flip = new Delay(0, 4);
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

	this.projectile_bomb.playable = this;
	this.projectile_laser.playable = this;
	this.projectile_sonar.playable = this;
	this.projectile_shield.playable = this;

	this.projectile_sonar.LoadImage();
	this.projectile_burst.LoadImage();
	this.projectile_laser.LoadImage();
	this.projectile_shield.LoadImage();

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

	this.Dispatch = _playable_dolphin_dispatch;
	this.Create = _playable_dolphin_create;
	this.Destroy = _playable_dolphin_destroy;

	this.InBound = _playable_dolphin_inbound;
	this.InBoundX = _playable_dolphin_inboundx;
	this.InBoundY = _playable_dolphin_inboundy;

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

function _projectile_bomb_draw() {

	if (this.instruction_megabomb == false)
		this.display_manager.StrokeRect(this.x+this.offset_x,
			this.y+this.offset_y, this.w, this.h, "#ff0000");

	this.display_manager.drawImage(this.handle, this.x, this.y);
	return;
}

function _projectile_bomb_process() {

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

	if (this.delay_flip.Process() == false) {

		this.burst.Create();

		this.burst.Create();
		this.burst.SetPoint(this.x, this.y);

		this.SetState(this._state.Burst);
		return;
	}

	if (this.instruction_megabomb == false)
		this.current.setRectangle(this.x+this.offset_x,
		this.y+this.offset_y, this.w, this.h);

	else this.current.setRectangle(this.viewport_manager.x,
		this.viewport_manager.y, this.viewport_manager.w,
		this.viewport_manager.h);


	this.Draw();		
	return;
}

function _projectile_bomb_inbound(boundry) {

	if (InBound(this.current, boundry) == true)
		return true;
			
	return false;
}

function _projectile_bomb_inboundplayable(playable) {

	if (this.state == this._state.Normal)
		return false;

	if (this._core_method_inboundplayable(playable) == true)

		return true;

	return false;
}

function _projectile_megabomb_create() {

	this.handle = new Image();
	this.handle.src = 'agartha/bomb-2.png';
	this.instruction_megabomb = true;

	this.Create();
}

function _projectile_bomb_create() {

	this.display_manager = this.playable.display_manager;
	this.viewport_manager = this.playable.viewport_manager;

	// constant:

	this.w = 40; this.h = 40;
	this.offset_x = -8; this.offset_y = -8;

	// initial:

	this.SetPoint(0, 0);
	this.current = new Rectangle(0, 0, 10, 10);
		
	// assign:

	this.SetState(this._state.Normal);

	this.burst = new _projectile_burst();
	this.burst.LoadImage();

	this.delay_flip = new Delay(0, 100);

	if (this.handle == null) {

		this.handle = new Image();
		this.handle.src = 'agartha/bomb-1.png';
		this.instruction_megabomb = false;
	}

	return;
}

function _projectile_bomb_destroy() {

	this.state = this._state.Purge;	
	this.instruction_megabomb = false;

	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;
	this.image_w = 0; this.index = 0;
	this.offset_x = 0; this.offset_y = 0;

	this.burst = null;
	this.current = null; this.handle = null;
	this.delay_flip = null;

	return;
}

function _projectile_bomb() {

	this._core_method_inboundplayable = _core_method_inboundplayable;
	this._projectile_megabomb_create = _projectile_megabomb_create;

	this.playable = null;
	this.display_manager = null;
	this.viewport_manager = null;

	this._state = new _core_state();

	this.state = this._state.Purge;
	this.instruction_megabomb = false;

	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;
	this.image_w = 0; this.index = 0;
	this.offset_x = 0; this.offset_y = 0;
	

	this.burst = null;
	this.current = null; this.handle = null;
	this.delay_flip = null;

	this.SetState = _core_method_setstate;
	this.SetPoint = _core_method_setpoint;

	this.Create = _projectile_bomb_create;
	this.Destroy = _projectile_bomb_destroy;

	this.InBound = _projectile_bomb_inbound;
	this.InBoundPlayable = _projectile_bomb_inboundplayable;
	this.Process = _projectile_bomb_process;
	this.Draw = _projectile_bomb_draw;
}


function _projectile_bubble_draw() {

	if (this.delay_blink.Process() == false)
		return

	this.display_manager.drawImage(this.handle[this.index], this.x, this.y);

	return;
}

function _projectile_bubble_inbound(boundry) {

	if (InBound(this.current, boundry) == true)
		return true;
			
	return false;
}

function _projectile_bubble_inboundplayable(playable) {

	if (playable.state == playable._state.Purge)
		return false;
	if (playable.state == playable._state.Burst)
		return false;

	if (playable.breath >= 3)
		return false;

	if (this.state == this._state.Purge)
		return false;
	if (this.state == this._state.Burst)
		return false;

	if (playable.InBound(this.current) == true) {

		playable.breath++;
		this.burst.Create();
		this.burst.Create(); this.burst.SetPoint(this.x, this.y);

		this.SetState(this._state.Burst);
		return true;
	}

	return false;
}

function _projectile_bubble_loadimage() {

	this.handle = new Array(2);
	this.handle[0] = new Image();
	this.handle[0].src = 'agartha/airbubble-1.png';

	this.handle[1] = new Image();
	this.handle[1].src = 'agartha/airbubble-2.png';

	return;
}

function _projectile_bubble_update() {

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

	this.current = new Rectangle(this.x+this.offset_x,
		this.y+this.offset_y, this.w, this.h);

	if (InBound(this.current, new Rectangle(this.viewport_manager.x, this.viewport_manager.y,
		this.viewport_manager.w, this.viewport_manager.h)) == false) {

		this.SetState(this._state.Purge);
		return;
	}

	if (this.delay_flip.Process() == false) {
		if (this.index == 1) this.index = 0;
			else this.index = 1;
		this.y--;
	}

	this.Draw();		
	return;
}

function _projectile_bubble_create() {

	this.display_manager = this.playable.display_manager;
	this.viewport_manager = this.playable.viewport_manager;

	// constant:
	this.w = 10; this.h = 10;
	this.offset_x = 7; this.offset_y = 7;

	// initial:
	this.index = 0;
	this.SetPoint(0, 0);
		
	// assign:
	this.burst = new _projectile_burst();
	this.burst.LoadImage();

	this.current = new Rectangle(0, 0, 0, 0);
	this.delay_blink = new Delay(0, 4);
	this.delay_flip = new Delay(0, 8);

	this.SetState(this._state.Normal);
	return;
}

function _projectile_bubble_destroy() {

	this.state = this._state.Purge;	
	
	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;

	this.id = 0; this.index = 0;
	this.offset_x = 0; this.offset_y = 0;

	this.burst = null; this.current = null;
	this.delay_blink = null; this.delay_flip = null;

	return;
}

function _projectile_bubble() {

	this._consumable = new _core_consumable();
	this._state = new _core_state();

	this.playable = null;
	this.display_manager = null;
	this.viewport_manager = null;

	this.state = this._state.Purge;	
	
	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;

	this.id = 0; this.index = 0;
	this.offset_x = 0; this.offset_y = 0;

	this.burst = null; this.current = null;
	this.delay_blink = null; this.delay_flip = null;
	this.handle = null;

	this.Create = _projectile_bubble_create;
	this.Destroy = _projectile_bubble_destroy;

	this.SetState = _core_method_setstate;
	this.SetPoint = _core_method_setpoint;

	this.Draw = _projectile_bubble_draw;
	this.InBound = _projectile_bubble_inbound;
	this.InBoundPlayable = _projectile_bubble_inboundplayable;
	this.LoadImage = _projectile_bubble_loadimage;
	this.Update = _projectile_bubble_update;
}


function _projectile_burst_create() {

	// initial

	this.SetPoint(0, 0);
	this.index = 0;	

	// assign

	this.SetState(this._state.Normal);
	this.delay_flip = new Delay(0, 5);
		
	return;
}

function _projectile_burst_destroy() {

	this.state = 0; this.index = 0;	
	this.x = 0; this.y = 0;
	this.delay_flip = null;

	return;
}

function _projectile_burst() {

	this._state = new _core_state();

	this.state = this._state.Purge;
	this.index = 0; this.x = 0; this.y = 0;

	this.handle = null;
	this.delay_flip = null;

	this.Create = _projectile_burst_create;
	this.Destroy = _projectile_burst_destroy;

	this.LoadImage = function() {

		var count = 0; var total = 3;

		this.handle = new Array(total);
		for (; count < total; count++)
			this.handle[count] = new Image();

		count = 0;
		this.handle[count].src = 'agartha/burst-1.png';
		this.handle[++count].src = 'agartha/burst-2.png';
		this.handle[++count].src = 'agartha/burst-3.png';

		return;
	}

	this.SetPoint = function(x, y) {

		this.x = x; this.y = y;
		return;
	}

	this.SetState = function(state) {

		this.state = state;

		if (this.state == this._state.Purge)
			this.Destroy();
		return;
	}

	this.UpdateFrame = function() {

		if (this.delay_flip.Process() == true)
			return 0;

		if (this.index < 2) {
			
			this.index++;	
			return 1;
		}
		
		this.SetState(this._state.Purge);
		return -1;
	}

	this.Process = function() {

		if (this.state == this._state.Purge)
			return;

		if (this.UpdateFrame() == -1)
			return;

		this.Draw();
		return;
	}

	this.Draw = function() {

		display.drawImage(this.handle[this.index], this.x, this.y);
		return;
	}
}

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


function _core_block_inboundary() {

	if (this.playable.state == this._state.Purge)
		return false;
	if (this.playable.state == this._state.Burst)
		return false;

	for (var count = 0; count < this.boundary.length; count++) {

		// this.display_manager.StrokeRect(this.boundary[count].x,
		//	this.boundary[count].y, this.boundary[count].w,
		//	this.boundary[count].h, '#ff0000');

		if (this.playable.InBoundX(this.boundary[count]))
			this.playable.outbound_x = false;
		if (this.playable.InBoundY(this.boundary[count]))
			this.playable.outbound_y = false;

		if ((this.playable.outbound_x == false) &&
			(this.playable.outbound_y == false))
				return true;
	}

	return;
}

function _core_block_process() {

	if (not_equal(this.cpu_dolphin, null))
		for (var count = 0; count < this.cpu_dolphin.length; count++) {
			this.cpu_dolphin[count].flag_hostile = true
			this.cpu_dolphin[count].Process();
		}

	if (not_equal(this.cpu_bluejelly, null))
		for (var count = 0; count < this.cpu_bluejelly.length; count++)
			this.cpu_bluejelly[count].Process();

	if (not_equal(this.cpu_blueshark, null))
		for (var count = 0; count < this.cpu_blueshark.length; count++)
			this.cpu_blueshark[count].Process();

	if (not_equal(this.cpu_glyph, null))
			for (var count = 0; count < this.cpu_glyph.length; count++)
				this.cpu_glyph[count].Process();

	if (not_equal(this.cpu_moirae, null))
		for (var count = 0; count < this.cpu_moirae.length; count++)
			this.cpu_moirae[count].Process();

	this.InBoundary();
	return;
}

function _core_block_update() {

	if (not_equal(this.cpu_airplant, null))
		for (var count = 0; count < this.cpu_airplant.length; count++)
			this.cpu_airplant[count].Update();

	if (not_equal(this.cpu_fish, null))
		for (var count = 0; count < this.cpu_fish.length; count++)
			this.cpu_fish[count].Update();

	if (not_equal(this.projectile_consumable, null))
		for (var count = 0; count < this.projectile_consumable.length; count++)
			this.projectile_consumable[count].Update();

	return;
}

function _level001_block100() {

	this.id = 100;

	this._state = new _core_state();
	this._direction = new _core_direction();
	this._consumable = new _core_consumable();

	this.playable = null;
	this.display_manager = null;
	this.hud_manager = null;

	this.InBoundary = _core_block_inboundary;
	this.Process = _core_block_process;
	this.Update = _core_block_update;

	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;

	this.background = null;
	this.boundary = null;
	this.surface_boundary = null;

	this.cpu_airplant = null;
	this.cpu_bluejelly = null;
	this.cpu_blueshark = null;
	this.cpu_dolphin = null;
	this.cpu_fish = null;
	this.cpu_glyph = null;
	this.cpu_moirae = null;
	this.projectile_consumable = null;

	this.Destroy = function() {

		this.x = 0; this.y = 0;
		this.w = 0; this.h = 0;

		this.background = null;
		this.boundary = null;
		this.surface_boundary = null;

		this.cpu_airplant = null;
		this.cpu_bluejelly = null;
		this.cpu_blueshark = null;
		this.cpu_dolphin = null;
		this.cpu_fish = null;
		this.cpu_glyph = null;
		this.cpu_moirae = null;
		this.projectile_consumable = null;

		return;
	}

	this.Create = function() {

		this.display_manager = this.playable.display_manager;
		this.hud_manager = this.playable.hud_manager;

		this.x = 0; this.y = 480;
		this.w = 320; this.h = 240;

		this.background = new Image();
		this.background.src = 'agartha/stage-100.png';

		this._boundary();
		this._cpuairplant();
		this._cpudolphin();
		this._cpufish();
		this._cpuglyph();
		this._projectileconsumable();

		return;
	}

	this._boundary = function() {

		this.boundary = new Array(13);
		for (var count = 0; count < this.boundary.length; count++)
			this.boundary[count] = new Rectangle(0, 0, 0, 0);

		this.boundary[0].setRectangle(0, 480, 40, 40);
		this.boundary[1].setRectangle(0, 520, 5, 120);
		this.boundary[2].setRectangle(0, 640, 40, 60);
		this.boundary[3].setRectangle(40, 640, 20, 60);
		this.boundary[4].setRectangle(60, 660, 40, 40);
		this.boundary[5].setRectangle(100, 665, 40, 30);
		this.boundary[6].setRectangle(140, 680, 20, 40);
		this.boundary[7].setRectangle(160, 715, 120, 5);
		this.boundary[8].setRectangle(280, 700, 40, 20);
		this.boundary[9].setRectangle(300, 480, 20, 120);
		this.boundary[10].setRectangle(240, 500, 60, 40);
		this.boundary[11].setRectangle(210, 520, 30, 20);
		this.boundary[12].setRectangle(300, 600, 20, 100);

		return;
	}

	this._cpuairplant = function() {

		this.cpu_airplant = new Array(2);

		this.cpu_airplant[0] = new _cpu_airplant();
		this.cpu_airplant[0].playable = this.playable;
		this.cpu_airplant[0].Create();
		
		this.cpu_airplant[0].SetColor('red');
		this.cpu_airplant[0].SetPoint(70, 635);

		this.cpu_airplant[1] = new _cpu_airplant();
		this.cpu_airplant[1].playable = this.playable;
		this.cpu_airplant[1].Create();

		this.cpu_airplant[1].SetColor('orange');
		this.cpu_airplant[1].SetPoint(100, 655);

		return;
	}

	this._cpudolphin = function() {

		this.cpu_dolphin = new Array(3);

		for (var count = 0; count < this.cpu_dolphin.length; count++) {

			this.cpu_dolphin[count] = new _cpu_dolphin();
			this.cpu_dolphin[count].playable = this.playable;
			this.cpu_dolphin[count].hud_manager = this.hud_manager;
		}

		this.cpu_dolphin[0].Create();
		this.cpu_dolphin[0].SetPoint(280, 580);

		this.cpu_dolphin[0].next_point = 0;
		this.cpu_dolphin[0].next = new Array(5);
		this.cpu_dolphin[0].next[0] = new Rectangle(290, 580, 20, 20);
		this.cpu_dolphin[0].next[1] = new Rectangle(100, 580, 20, 20);
		this.cpu_dolphin[0].next[2] = new Rectangle(100, 500, 20, 20);
		this.cpu_dolphin[0].next[3] = new Rectangle(100, 580, 20, 20);
		this.cpu_dolphin[0].next[4] = new Rectangle(20, 580, 20, 20);

		this.cpu_dolphin[0].text = new Array(2);
		this.cpu_dolphin[0].text[0] = "DOLPHIN";
		this.cpu_dolphin[0].text[1] = "SING TO THE PLANTS TO REPLENISH\nYOUR BREATH.";

		this.cpu_dolphin[1]._cpu_orca_create();
		this.cpu_dolphin[1].SetPoint(50, 480);

		this.cpu_dolphin[1].next_point = 0;
		this.cpu_dolphin[1].next = new Array(2);
		this.cpu_dolphin[1].next[0] = new Rectangle(50, 530, 20, 20);
		this.cpu_dolphin[1].next[1] = new Rectangle(250, 530, 20, 20);

		this.cpu_dolphin[1].text = new Array(2);
		this.cpu_dolphin[1].text[0] = "ORCA";
		this.cpu_dolphin[1].text[1] = "SING TO THE LARGE CRYSTAL TO\nREVEAL IT'S HIDDEN MESSAGE.";

		this.cpu_dolphin[2]._cpu_orca_create();
		this.cpu_dolphin[2].SetDirection(this._direction.Right);
		this.cpu_dolphin[2].SetPoint(240, 660);

		this.cpu_dolphin[2].next_point = 0;
		this.cpu_dolphin[2].next = null;

		this.cpu_dolphin[2].text = new Array(2);
		this.cpu_dolphin[2].text[0] = "ORCA";
		this.cpu_dolphin[2].text[1] = "COINS WERE USED BY THE\nINHABITANTS OF ANCIENT POISED\nTO ACTIVATE";
		this.cpu_dolphin[2].text[1]+= " THEIR TECHNOLOGY.\nTHERE ARE FIVE COINS IN ALL.";

		return;
	}

	this._cpufish = function() {

		this.cpu_fish = new Array(9);
		for (var count = 0; count < this.cpu_fish.length; count++) {

			this.cpu_fish[count] = new _cpu_fish();
			this.cpu_fish[count].playable = this.playable;
			this.cpu_fish[count].Create();
		}

		this.cpu_fish[0].SetSpecies('stripes');
		this.cpu_fish[0].SetPoint(190, 680);
		this.cpu_fish[0].SetBoundaryWidth(60);

		this.cpu_fish[1].SetSpecies('red');
		this.cpu_fish[1].SetPoint(175, 685);
		this.cpu_fish[1].SetBoundaryWidth(55);

		this.cpu_fish[2].SetSpecies('risingsun');
		this.cpu_fish[2].SetPoint(180, 690);
		this.cpu_fish[2].SetBoundaryWidth(50);

		this.cpu_fish[3].SetSpecies('stripes');
		this.cpu_fish[3].SetPoint(140, 530);
		this.cpu_fish[3].SetBoundaryWidth(60);

		this.cpu_fish[4].SetSpecies('red');
		this.cpu_fish[4].SetPoint(150, 540);
		this.cpu_fish[4].SetBoundaryWidth(55);

		this.cpu_fish[5].SetSpecies('risingsun');
		this.cpu_fish[5].SetPoint(160, 550);
		this.cpu_fish[5].SetBoundaryWidth(55);

		this.cpu_fish[6].SetSpecies('stripes');
		this.cpu_fish[6].SetPoint(160, 535);
		this.cpu_fish[6].SetBoundaryWidth(60);

		this.cpu_fish[7].SetSpecies('red');
		this.cpu_fish[7].SetPoint(165, 545);
		this.cpu_fish[7].SetBoundaryWidth(50);

		this.cpu_fish[8].SetSpecies('risingsun');
		this.cpu_fish[8].SetPoint(145, 555);
		this.cpu_fish[8].SetBoundaryWidth(50);

		return;
	}


	this._cpuglyph = function() {

		this.cpu_glyph = new Array(1);

		this.cpu_glyph[0] = new _cpu_glyph();
		this.cpu_glyph[0].playable = this.playable;
		this.cpu_glyph[0].Create();
		
		this.cpu_glyph[0].SetPoint(210, 495);
		this.cpu_glyph[0].SetId('hercules');
		this.cpu_glyph[0].SetDirection(this._direction.Left);

		this.cpu_glyph[0].text = new Array(2);
		this.cpu_glyph[0].text[0] = "HOLOGRAM";
		this.cpu_glyph[0].text[1] = "LARGE CRYSTALS CALLED GLYPHS\nCONTAIN THE ESSENCE";
		this.cpu_glyph[0].text[1]+= " OF THOSE\nLONG PASSED. THESE CRYSTALS ARE\nTHE RESULT";
		this.cpu_glyph[0].text[1]+= " OF TECHNOLOGY CREATED\nTHOUSANDS OF YEARS AGO.";

		return;
	}

	this._projectileconsumable = function() {

		var count = 0;
		this.projectile_consumable = new Array(3);

		this.projectile_consumable[0] = new _projectile_consumable();
		this.projectile_consumable[0].playable = this.playable;

		this.projectile_consumable[0].Create(this._consumable.HealthJar);
		this.projectile_consumable[0].SetPoint(50, 495);
		this.projectile_consumable[0].total = 1;

		this.projectile_consumable[1] = new _projectile_consumable();
		this.projectile_consumable[1].playable = this.playable;

		this.projectile_consumable[1].Create(this._consumable.AirJar);
		this.projectile_consumable[1].SetPoint(255, 540);
		this.projectile_consumable[1].total = 1;

		this.projectile_consumable[2] = new _projectile_consumable();
		this.projectile_consumable[2].playable = this.playable;

		this.projectile_consumable[2].Create(this._consumable.Coin);
		this.projectile_consumable[2].SetPoint(280, 680);
		this.projectile_consumable[2].total = 1;

		return;
	}
}

function _level001_block101() {

	this.id = 101;
	
	this._state = new _core_state();
	this._direction = new _core_direction();
	this._consumable = new _core_consumable();

	this.playable = null;
	this.display_manager = null;
	this.hud_manager = null;

	this.InBoundary = _core_block_inboundary;
	this.Process = _core_block_process;
	this.Update = _core_block_update;

	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;

	this.background = null;
	this.boundary = null;
	this.surface_boundary = null;

	this.cpu_airplant = null;
	this.cpu_bluejelly = null;
	this.cpu_blueshark = null;
	this.cpu_dolphin = null;
	this.cpu_fish = null;
	this.cpu_glyph = null;
	this.cpu_moirae = null;
	this.projectile_consumable = null;

	this.Destroy = function() {

		this.x = 0; this.y = 0;
		this.w = 0; this.h = 0;

		this.background = null;
		this.boundary = null;
		this.surface_boundary = null;

		this.cpu_airplant = null;
		this.cpu_bluejelly = null;
		this.cpu_blueshark = null;
		this.cpu_dolphin = null;
		this.cpu_fish = null;
		this.cpu_glyph = null;
		this.cpu_moirae = null;
		this.projectile_consumable = null;

		return;
	}

	this.Create = function() {

		this.display_manager = this.playable.display_manager;
		this.hud_manager = this.playable.hud_manager;

		this.x = 0; this.y = 240;
		this.w = 320; this.h = 240;

		this.background = new Image();
		this.background.src = 'agartha/segment-101.png';

		this._boundary();
		this._cpuairplant();
		this._cpubluejelly();
		this._cpublueshark();
		this._cpufish();
		this._cpuglyph();
		this._projectileconsumable();

		return;
	}

	this._boundary = function() {

		this.boundary = new Array(4);
		for (var count = 0; count < this.boundary.length; count++)
			this.boundary[count] = new Rectangle(0, 0, 0, 0);

		this.boundary[0].setRectangle(0, 240, 40, 240);
		this.boundary[1].setRectangle(40, 280, 20, 20);
		this.boundary[2].setRectangle(40, 380, 20, 20);
		this.boundary[3].setRectangle(300, 460, 20, 20);

		return;
	}

	this._cpuairplant = function() {

		this.cpu_airplant = new Array(1);
		this.cpu_airplant[0] = new _cpu_airplant();
		this.cpu_airplant[0].playable = this.playable;

		this.cpu_airplant[0].Create();
		this.cpu_airplant[0].SetColor('red');
		this.cpu_airplant[0].SetPoint(55, 360);

		return;
	}

	this._cpubluejelly = function() {

		this.cpu_bluejelly = new Array(19);
		for (var count = 0; count < this.cpu_bluejelly.length; count++) {

			this.cpu_bluejelly[count] = new _cpu_bluejelly();
			this.cpu_bluejelly[count].playable = this.playable;
			this.cpu_bluejelly[count].Create();			
		}

		this.cpu_bluejelly[0].SetPoint(160, 280);
		this.cpu_bluejelly[1].SetPoint(170, 290);
		this.cpu_bluejelly[2].SetPoint(150, 300);
		
		this.cpu_bluejelly[3].SetPoint(200, 310);
		this.cpu_bluejelly[4].SetPoint(210, 320);
		this.cpu_bluejelly[5].SetPoint(200, 330);

		this.cpu_bluejelly[6].SetPoint(120, 350);
		this.cpu_bluejelly[7].SetPoint(130, 360);
		this.cpu_bluejelly[8].SetPoint(110, 370);

		this.cpu_bluejelly[9].SetPoint(180, 420);
		this.cpu_bluejelly[10].SetPoint(170, 430);
		this.cpu_bluejelly[11].SetPoint(190, 440);

		this.cpu_bluejelly[12].SetPoint(240, 410);
		this.cpu_bluejelly[13].SetPoint(230, 400);
		this.cpu_bluejelly[14].SetPoint(260, 390);

		this.cpu_bluejelly[15]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[15].SetPoint(190, 320);

		this.cpu_bluejelly[16]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[16].SetPoint(140, 390);

		this.cpu_bluejelly[17]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[17].SetPoint(120, 390);

		this.cpu_bluejelly[18]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[18].SetPoint(130, 400);

		return;
	}

	this._cpublueshark = function() {

		this.cpu_blueshark = new Array(2);

		this.cpu_blueshark[0] = new _cpu_blueshark();
		this.cpu_blueshark[0].playable = this.playable;
		this.cpu_blueshark[0].Create();

		this.cpu_blueshark[0].SetPoint(60, 290);
		this.cpu_blueshark[0].SetBoundaryWidth(100);
		this.cpu_blueshark[0].SetDirection(this._direction.Left);

		this.cpu_blueshark[1] = new _cpu_blueshark();
		this.cpu_blueshark[1].playable = this.playable;
		this.cpu_blueshark[1]._cpu_reefshark_create();

		this.cpu_blueshark[1].SetPoint(180, 350);
		this.cpu_blueshark[1].SetBoundaryWidth(80);
		this.cpu_blueshark[1].SetDirection(this._direction.Right);
		
		return;
	}

	this._cpufish = function() {

		this.cpu_fish = new Array(3);

		for (var count = 0; count < this.cpu_fish.length; count++) {

			this.cpu_fish[count] = new _cpu_fish();
			this.cpu_fish[count].playable = this.playable;
			this.cpu_fish[count].Create();
		}

		this.cpu_fish[0].SetSpecies('stripes');
		this.cpu_fish[0].SetPoint(200, 290);
		this.cpu_fish[0].SetBoundaryWidth(55);

		this.cpu_fish[1].SetSpecies('red');
		this.cpu_fish[1].SetPoint(215, 285);
		this.cpu_fish[1].SetBoundaryWidth(40);

		this.cpu_fish[2].SetSpecies('risingsun');
		this.cpu_fish[2].SetPoint(210, 275);
		this.cpu_fish[2].SetBoundaryWidth(50);

		return;
	}

	this._cpuglyph = function() {

		this.cpu_glyph = new Array(1);

		this.cpu_glyph[0] = new _cpu_glyph();
		this.cpu_glyph[0].playable = this.playable;
		this.cpu_glyph[0].Create();
		
		this.cpu_glyph[0].SetId('nalia');
		this.cpu_glyph[0].SetPoint(40, 265);
		this.cpu_glyph[0].SetDirection(this._direction.Right);

		this.cpu_glyph[0].text = new Array(2);
		this.cpu_glyph[0].text[0] = "HOLOGRAM";
		this.cpu_glyph[0].text[1] = "SCATTERED THROUGHOUT AGARTHA ARE\nPIECES OF TECHNOLOGY";
		this.cpu_glyph[0].text[1] += " LEFT BEHIND\nBY THE LEMURIANS, CREATED FOR WE,\nTHE SINGERS";

		return;
	}

	this._projectileconsumable = function() {

		this.projectile_consumable = new Array(3);

		this.projectile_consumable[0] = new _projectile_consumable();
		this.projectile_consumable[0].playable = this.playable;
		this.projectile_consumable[0].Create(this._consumable.HealthJar);

		this.projectile_consumable[0].SetPoint(40, 350);
		this.projectile_consumable[0].total = 1;

		this.projectile_consumable[1] = new _projectile_consumable();
		this.projectile_consumable[1].playable = this.playable;
		this.projectile_consumable[1].Create(this._consumable.AirJar);

		this.projectile_consumable[1].SetPoint(280, 455);
		this.projectile_consumable[1].total = 1;

		this.projectile_consumable[2] = new _projectile_consumable();
		this.projectile_consumable[2].playable = this.playable;
		this.projectile_consumable[2].Create(this._consumable.Coin);

		this.projectile_consumable[2].SetPoint(300, 445);
		this.projectile_consumable[2].total = 1;

		return;
	}
}

function _level001_block102() {

	this.id = 102;
	
	this._state = new _core_state();
	this._direction = new _core_direction();
	this._consumable = new _core_consumable();

	this.playable = null;
	this.display_manager = null;
	this.hud_manager = null;

	this.InBoundary = _core_block_inboundary;
	this.Process = _core_block_process;
	this.Update = _core_block_update;

	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;

	this.background = null;
	this.boundary = null;
	this.surface_boundary = null;

	this.cpu_airplant = null;
	this.cpu_bluejelly = null;
	this.cpu_blueshark = null;
	this.cpu_dolphin = null;
	this.cpu_fish = null;
	this.cpu_glyph = null;
	this.cpu_moirae = null;
	this.projectile_consumable = null;

	this.Destroy = function() {

		this.x = 0; this.y = 0;
		this.w = 0; this.h = 0;

		this.background = null;
		this.boundary = null;
		this.surface_boundary = null;

		this.cpu_airplant = null;
		this.cpu_bluejelly = null;
		this.cpu_blueshark = null;
		this.cpu_dolphin = null;
		this.cpu_fish = null;
		this.cpu_glyph = null;
		this.cpu_moirae = null;
		this.projectile_consumable = null;

		return;
	}

	this.Create = function() {

		this.display_manager = this.playable.display_manager;
		this.hud_manager = this.playable.hud_manager;

		this.x = 0; this.y = 0;
		this.w = 320; this.h = 240;

		this.background = new Image();
		this.background.src = 'agartha/segment-102.png';

		this._boundary();
		this._cpuairplant();
		this._cpubluejelly();
		this._cpudolphin();
		this._cpufish();
		this._projectileconsumable();

		return;
	}

	this._boundary = function() {

		this.boundary = new Array(4);
		for (var count = 0; count < this.boundary.length; count++)
			this.boundary[count] = new Rectangle(0, 0, 0, 0);

		this.surface_boundary = new Rectangle(0, 100, 320, 1);
		this.boundary[0] = this.surface_boundary.getRectangle();

		this.boundary[1].setRectangle(0, 80, 80, 80);
		this.boundary[2].setRectangle(0, 160, 60, 30);
		this.boundary[3].setRectangle(0, 190, 40, 50);
		return;
	}

	this._cpuairplant = function() {

		this.cpu_airplant = new Array(1);

		this.cpu_airplant[0] = new _cpu_airplant();
		this.cpu_airplant[0].set_playable(this.playable);

		this.cpu_airplant[0].Create();
		this.cpu_airplant[0].SetColor('orange');
		this.cpu_airplant[0].SetPoint(40, 195);

		return;
	}

	this._cpubluejelly = function() {

		this.cpu_bluejelly = new Array(7);

		for (var count = 0; count < this.cpu_bluejelly.length; count++) {

			this.cpu_bluejelly[count] = new _cpu_bluejelly();
			this.cpu_bluejelly[count].playable = this.playable;
			this.cpu_bluejelly[count].Create();			
		}

		this.cpu_bluejelly[0].SetPoint(170, 180);
		this.cpu_bluejelly[1].SetPoint(180, 190);
		this.cpu_bluejelly[2].SetPoint(190, 180);
		this.cpu_bluejelly[3].SetPoint(120, 160);
		this.cpu_bluejelly[4].SetPoint(110, 150);

		this.cpu_bluejelly[5]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[5].SetPoint(100, 165);

		this.cpu_bluejelly[6]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[6].SetPoint(180, 170);

		return;
	}

	this._cpublueshark = function() {

		this.cpu_blueshark = new Array(1);

		this.cpu_blueshark[0] = new _cpu_blueshark();
		this.cpu_blueshark[0].playable = this.playable;

		this.cpu_blueshark[0]._cpu_reefshark_create();
		this.cpu_blueshark[0].SetPoint(180, 110);
		this.cpu_blueshark[0].SetBoundaryWidth(80);
		this.cpu_blueshark[0].SetDirection(this._direction.Right);
		
		return;
	}

	this._cpudolphin = function() {

		this.cpu_dolphin = new Array(1);

		this.cpu_dolphin[0] = new _cpu_dolphin();
		this.cpu_dolphin[0].playable = this.playable;
		this.cpu_dolphin[0]._cpu_orca_create();

		this.cpu_dolphin[0].SetPoint(100, 100);
		this.cpu_dolphin[0].next_point = 0;

		this.cpu_dolphin[0].next = new Array(2);
		this.cpu_dolphin[0].next[0] = new Rectangle(50, 150, 20, 20);
		this.cpu_dolphin[0].next[1] = new Rectangle(250, 150, 20, 20);

		this.cpu_dolphin[0].text = new Array(1);
		this.cpu_dolphin[0].text[0] = "ORCA";
		this.cpu_dolphin[0].text[1] = "SHARKS ARE KNOWN TO EAT BOMBS.";

		return;
	}

	this._cpufish = function() {

		this.cpu_fish = new Array(3);

		for (var count = 0; count < this.cpu_fish.length; count++) {

			this.cpu_fish[count] = new _cpu_fish();
			this.cpu_fish[count].playable = this.playable;
			this.cpu_fish[count].Create();
		}

		this.cpu_fish[0].SetSpecies('stripes');
		this.cpu_fish[0].SetPoint(80, 170);
		this.cpu_fish[0].SetBoundaryWidth(45);

		this.cpu_fish[1].SetSpecies('red');
		this.cpu_fish[1].SetPoint(85, 175);
		this.cpu_fish[1].SetBoundaryWidth(40);

		this.cpu_fish[2].SetSpecies('risingsun');
		this.cpu_fish[2].SetPoint(90, 160);
		this.cpu_fish[2].SetBoundaryWidth(55);

		return;
	}

	this._projectileconsumable = function() {

		this.projectile_consumable = new Array(2);

		this.projectile_consumable[0] = new _projectile_consumable();
		this.projectile_consumable[0].playable = this.playable;
		this.projectile_consumable[0].Create(this._consumable.Laser);
		this.projectile_consumable[0].SetPoint(80, 100);
		this.projectile_consumable[0].total = 1;

		this.projectile_consumable[1] = new _projectile_consumable();
		this.projectile_consumable[1].playable = this.playable;
		this.projectile_consumable[1].Create(this._consumable.Coin);
		this.projectile_consumable[1].SetPoint(70, 140);
		this.projectile_consumable[1].total = 1;

		return;
	}
}

function _level001_block103() {

	this.id = 103;

	this._state = new _core_state();
	this._direction = new _core_direction();
	this._consumable = new _core_consumable();	

	this.playable = null;
	this.display_manager = null;
	this.hud_manager = null;

	this.InBoundary = _core_block_inboundary;
	this.Process = _core_block_process;
	this.Update = _core_block_update;

	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;

	this.background = null;
	this.boundary = null;
	this.surface_boundary = null;

	this.cpu_airplant = null;
	this.cpu_bluejelly = null;
	this.cpu_blueshark = null;
	this.cpu_dolphin = null;
	this.cpu_fish = null;
	this.cpu_glyph = null;
	this.cpu_moirae = null;
	this.projectile_consumable = null;

	this.Destroy = function() {

		this.x = 0; this.y = 0;
		this.w = 0; this.h = 0;

		this.background = null;
		this.boundary = null;
		this.surface_boundary = null;

		this.cpu_airplant = null;
		this.cpu_bluejelly = null;
		this.cpu_blueshark = null;
		this.cpu_dolphin = null;
		this.cpu_fish = null;
		this.cpu_glyph = null;
		this.cpu_moirae = null;
		this.projectile_consumable = null;

		return;
	}

	this.Create = function() {

		this.display_manager = this.playable.display_manager;
		this.hud_manager = this.playable.hud_manager;

		this.x = 320; this.y = 480;
		this.w = 320; this.h = 240;

		this.background = new Image();
		this.background.src = 'agartha/segment-103.png';

		this._boundary();
		this._cpuairplant();
		this._cpubluejelly();
		this._cpublueshark();
		this._cpufish();
		this._cpuglyph();

		return;
	}

	this._boundary = function() {

		this.boundary = new Array(10);

		for (var count = 0; count < this.boundary.length; count++)
			this.boundary[count] = new Rectangle(0, 0, 0, 0);

		this.boundary[0].setRectangle(600, 540, 40, 60);
		this.boundary[1].setRectangle(320, 480, 70, 50);
		this.boundary[2].setRectangle(320, 640, 20, 80);
		this.boundary[3].setRectangle(340, 640, 20, 80);
		this.boundary[4].setRectangle(360, 680, 210, 40);
		this.boundary[5].setRectangle(520, 660, 120, 20);
		this.boundary[6].setRectangle(580, 600, 60, 60);
		this.boundary[7].setRectangle(580, 520, 60, 20);
		this.boundary[8].setRectangle(540, 480, 100, 40);
		this.boundary[9].setRectangle(320, 530, 40, 50);

		return;
	}

	this._cpuairplant = function() {

		this.cpu_airplant = new Array(1);

		this.cpu_airplant[0] = new _cpu_airplant();
		this.cpu_airplant[0].playable = this.playable;
		this.cpu_airplant[0].Create();

		this.cpu_airplant[0].SetColor('red');
		this.cpu_airplant[0].SetPoint(380, 655);

		return;
	}

	this._cpubluejelly = function() {

		this.cpu_bluejelly = new Array(19);

		for (var count = 0; count < this.cpu_bluejelly.length; count++) {

			this.cpu_bluejelly[count] = new _cpu_bluejelly();
			this.cpu_bluejelly[count].playable = this.playable;
			this.cpu_bluejelly[count].Create();			
		}

		this.cpu_bluejelly[0].SetPoint(480, 520);
		this.cpu_bluejelly[1].SetPoint(490, 530);
		this.cpu_bluejelly[2].SetPoint(470, 540);
		
		this.cpu_bluejelly[3].SetPoint(380, 550);
		this.cpu_bluejelly[4].SetPoint(370, 560);
		this.cpu_bluejelly[5].SetPoint(390, 570);

		this.cpu_bluejelly[6].SetPoint(440, 590);
		this.cpu_bluejelly[7].SetPoint(450, 600);
		this.cpu_bluejelly[8].SetPoint(430, 610);

		this.cpu_bluejelly[9].SetPoint(500, 590);
		this.cpu_bluejelly[10].SetPoint(490, 600);
		this.cpu_bluejelly[11].SetPoint(510, 610);

		this.cpu_bluejelly[12].SetPoint(400, 660);
		this.cpu_bluejelly[13].SetPoint(390, 670);
		this.cpu_bluejelly[14].SetPoint(420, 680);

		this.cpu_bluejelly[15]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[15].SetPoint(470, 520);

		this.cpu_bluejelly[16]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[16].SetPoint(370, 580);

		this.cpu_bluejelly[17]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[17].SetPoint(500, 620);

		this.cpu_bluejelly[18]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[18].SetPoint(445, 625);

		return;
	}

	this._cpublueshark = function() {

		this.cpu_blueshark = new Array(1);

		this.cpu_blueshark[0] = new _cpu_blueshark();
		this.cpu_blueshark[0].playable = this.playable;
		this.cpu_blueshark[0]._cpu_reefshark_create();

		this.cpu_blueshark[0].SetPoint(500, 590);
		this.cpu_blueshark[0].SetBoundaryWidth(80);
		this.cpu_blueshark[0].SetDirection(this._direction.Right);
		
		return;
	}

	this._cpufish = function() {

		this.cpu_fish = new Array(6);

		for (var count = 0; count < this.cpu_fish.length; count++) {

			this.cpu_fish[count] = new _cpu_fish();
			this.cpu_fish[count].playable = this.playable;
			this.cpu_fish[count].Create();
		}

		this.cpu_fish[0].SetSpecies('stripes');
		this.cpu_fish[0].SetPoint(560, 530);
		this.cpu_fish[0].SetBoundaryWidth(50);

		this.cpu_fish[1].SetSpecies('red');
		this.cpu_fish[1].SetPoint(545, 535);
		this.cpu_fish[1].SetBoundaryWidth(50);

		this.cpu_fish[2].SetSpecies('risingsun');
		this.cpu_fish[2].SetPoint(550, 540);
		this.cpu_fish[2].SetBoundaryWidth(50);

		this.cpu_fish[3].SetSpecies('stripes');
		this.cpu_fish[3].SetPoint(440, 650);
		this.cpu_fish[3].SetBoundaryWidth(50);

		this.cpu_fish[4].SetSpecies('red');
		this.cpu_fish[4].SetPoint(425, 655);
		this.cpu_fish[4].SetBoundaryWidth(50);

		this.cpu_fish[5].SetSpecies('risingsun');
		this.cpu_fish[5].SetPoint(430, 660);
		this.cpu_fish[5].SetBoundaryWidth(50);

		return;
	}

	this._cpuglyph = function() {

		this.cpu_glyph = new Array(1);
		this.cpu_glyph[0] = new _cpu_glyph();
		this.cpu_glyph[0].playable = this.playable;

		this.cpu_glyph[0].Create();

		this.cpu_glyph[0].SetPoint(600, 575);
		this.cpu_glyph[0].SetId('nalia');
		this.cpu_glyph[0].SetDirection(this._direction.Left);

		this.cpu_glyph[0].text = Array(2);
		this.cpu_glyph[0].text[0] = "HOLOGRAM";
		this.cpu_glyph[0].text[1] = "YOU MAY NOT PASS UNTIL YOU HAVE\nCOLLECTED FIVE";
		this.cpu_glyph[0].text[1]+= "LEVIAN COINS.";

		return;
	}
}

function _level001_block104() {

	this.id = 104;
	
	this._state = new _core_state();
	this._direction = new _core_direction();
	this._consumable = new _core_consumable();	

	this.playable = null;
	this.display_manager = null;
	this.hud_manager = null;

	this.InBoundary = _core_block_inboundary;
	this.Process = _core_block_process;
	this.Update = _core_block_update;

	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;

	this.background = null;
	this.boundary = null;
	this.surface_boundary = null;

	this.cpu_airplant = null;
	this.cpu_bluejelly = null;
	this.cpu_blueshark = null;
	this.cpu_dolphin = null;
	this.cpu_fish = null;
	this.cpu_glyph = null;
	this.cpu_moirae = null;
	this.projectile_consumable = null;

	this.Destroy = function() {

		this.x = 0; this.y = 0;
		this.w = 0; this.h = 0;

		this.background = null;
		this.boundary = null;
		this.surface_boundary = null;

		this.cpu_airplant = null;
		this.cpu_bluejelly = null;
		this.cpu_blueshark = null;
		this.cpu_dolphin = null;
		this.cpu_fish = null;
		this.cpu_glyph = null;
		this.cpu_moirae = null;
		this.projectile_consumable = null;

		return;
	}

	this.Create = function() {

		this.display_manager = this.playable.display_manager;
		this.hud_manager = this.playable.hud_manager;

		this.x = 320; this.y = 240;
		this.w = 320; this.h = 240;

		this.background = new Image();
		this.background.src = 'agartha/segment-104.png';

		this._boundary();
		this._cpuairplant();
		this._cpubluejelly();
		this._cpublueshark();
		this._projectileconsumable();

		return;
	}

	this._boundary = function() {

		this.boundary = new Array(4);

		for (var count = 0; count < this.boundary.length; count++)
			this.boundary[count] = new Rectangle(0, 0, 0, 0);

		this.boundary[0].setRectangle(320, 460, 50, 20);
		this.boundary[1].setRectangle(540, 460, 100, 20);
		this.boundary[2].setRectangle(580, 400, 60, 60);
		this.boundary[3].setRectangle(600, 240, 40, 160);

		return;
	}

	this._cpuairplant = function() {

		this.cpu_airplant = new Array(1);

		this.cpu_airplant[0] = new _cpu_airplant();
		this.cpu_airplant[0].playable = this.playable;
		this.cpu_airplant[0].Create();

		this.cpu_airplant[0].SetColor('orange');
		this.cpu_airplant[0].SetPoint(350, 675);

		return;
	}

	this._cpubluejelly = function() {

		this.cpu_bluejelly = new Array(8);

		for (var count = 0; count < this.cpu_bluejelly.length; count++) {

			this.cpu_bluejelly[count] = new _cpu_bluejelly();
			this.cpu_bluejelly[count].playable = this.playable;
			this.cpu_bluejelly[count].Create();			
		}

		this.cpu_bluejelly[0].SetPoint(500, 390);
		this.cpu_bluejelly[1].SetPoint(510, 400);
		this.cpu_bluejelly[2].SetPoint(520, 410);

		this.cpu_bluejelly[3].SetPoint(530, 410);
		this.cpu_bluejelly[4].SetPoint(540, 400);
		this.cpu_bluejelly[5].SetPoint(550, 390);

		this.cpu_bluejelly[6]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[6].SetPoint(528, 370);

		this.cpu_bluejelly[7]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[7].SetPoint(528, 390);

		return;
	}

	this._cpublueshark = function() {

		this.cpu_blueshark = new Array(7);
		for (var count = 0; count < this.cpu_blueshark.length; count++) {

			this.cpu_blueshark[count] = new _cpu_blueshark();
			this.cpu_blueshark[count].playable = this.playable;
			this.cpu_blueshark[count].Create();
		}

		this.cpu_blueshark[0].SetPoint(300, 240);
		this.cpu_blueshark[0].SetBoundaryWidth(100);

		this.cpu_blueshark[1].SetPoint(270, 265);
		this.cpu_blueshark[1].SetBoundaryWidth(100);

		this.cpu_blueshark[2].SetPoint(300, 285);
		this.cpu_blueshark[2].SetBoundaryWidth(100);

		this.cpu_blueshark[3]._cpu_reefshark_loadimage();
		this.cpu_blueshark[3].SetPoint(410, 260);
		this.cpu_blueshark[3].SetBoundaryWidth(100);

		this.cpu_blueshark[4]._cpu_reefshark_loadimage();
		this.cpu_blueshark[4].SetPoint(430, 280);
		this.cpu_blueshark[4].SetBoundaryWidth(100);

		this.cpu_blueshark[5]._cpu_reefshark_loadimage();
		this.cpu_blueshark[5].SetPoint(410, 300);
		this.cpu_blueshark[5].SetBoundaryWidth(100);

		this.cpu_blueshark[6]._cpu_reefshark_loadimage();
		this.cpu_blueshark[6].SetPoint(420, 430);
		this.cpu_blueshark[6].SetBoundaryWidth(100);
		
		return;
	}

	this._projectileconsumable = function() {

		this.projectile_consumable = new Array(3);

		this.projectile_consumable[0] = new _projectile_consumable();
		this.projectile_consumable[0].playable = this.playable;
		this.projectile_consumable[0].Create(this._consumable.Bomb);
		this.projectile_consumable[0].SetPoint(360, 460);
		this.projectile_consumable[0].total = 1;

		this.projectile_consumable[1] = new _projectile_consumable();
		this.projectile_consumable[1].playable = this.playable;
		this.projectile_consumable[1].Create(this._consumable.Bomb);
		this.projectile_consumable[1].SetPoint(570, 345);
		this.projectile_consumable[1].total = 1;

		this.projectile_consumable[2] = new _projectile_consumable();
		this.projectile_consumable[2].playable = this.playable;
		this.projectile_consumable[2].Create(this._consumable.Coin);
		this.projectile_consumable[2].SetPoint(570, 285);
		this.projectile_consumable[2].total = 1;

		return;
	}
}

function _level001_block105() {

	this.id = 105;

	this._state = new _core_state();
	this._direction = new _core_direction();
	this._consumable = new _core_consumable();

	this.playable = null;
	this.display_manager = null;
	this.hud_manager = null;

	this.InBoundary = _core_block_inboundary;
	this.Process = _core_block_process;
	this.Update = _core_block_update;

	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;	

	this.background = null;
	this.boundary = null;
	this.surface_boundary = null;

	this.cpu_airplant = null;
	this.cpu_bluejelly = null;
	this.cpu_blueshark = null;
	this.cpu_dolphin = null;
	this.cpu_fish = null;
	this.cpu_glyph = null;
	this.cpu_moirae = null;
	this.projectile_consumable = null;

	this.Destroy = function() {

		this.x = 0; this.y = 0;
		this.w = 0; this.h = 0;	

		this.background = null;
		this.boundary = null;
		this.surface_boundary = null;

		this.cpu_airplant = null;
		this.cpu_bluejelly = null;
		this.cpu_blueshark = null;
		this.cpu_dolphin = null;
		this.cpu_fish = null;
		this.cpu_glyph = null;
		this.cpu_moirae = null;
		this.projectile_consumable = null;

		return;
	}

	this.Create = function() {

		this.display_manager = this.playable.display_manager;
		this.hud_manager = this.playable.hud_manager;

		this.x = 320; this.y = 0;
		this.w = 320; this.h = 240;

		this.background = new Image();
		this.background.src = 'agartha/segment-105.png';

		this._boundary();
		this._cpuairplant();
		this._cpublueshark();
		this._cpufish();
		this._cpuglyph();
		this._projectileconsumable();

		return;
	}

	this._boundary = function() {

		this.boundary = new Array(3);

		for (var count = 0; count < this.boundary.length; count++)
			this.boundary[count] = new Rectangle(0, 0, 0, 0);

		this.surface_boundary = new Rectangle(320, 100, 320, 1);
		this.boundary[0] = this.surface_boundary.getRectangle();

		this.boundary[1].setRectangle(600, 60, 40, 180);
		this.boundary[2].setRectangle(580, 140, 20, 40);

		return;
	}

	this._cpuairplant = function() {

		this.cpu_airplant = new Array(2);

		this.cpu_airplant[0] = new _cpu_airplant();
		this.cpu_airplant[0].playable = this.playable;
		this.cpu_airplant[0].Create();

		this.cpu_airplant[0].SetColor('red');
		this.cpu_airplant[0].SetPoint(585, 135);

		this.cpu_airplant[1] = new _cpu_airplant();
		this.cpu_airplant[1].playable = this.playable;
		this.cpu_airplant[1].Create();

		this.cpu_airplant[1].SetColor('orange');
		this.cpu_airplant[1].SetPoint(570, 180);

		return;
	}

	this._cpublueshark = function() {

		this.cpu_blueshark = new Array(2);

		for (var count = 0; count < this.cpu_blueshark.length; count++) {

			this.cpu_blueshark[count] = new _cpu_blueshark();
			this.cpu_blueshark[count].playable = this.playable;
			this.cpu_blueshark[count]._cpu_reefshark_create();
		}

		this.cpu_blueshark[0].SetPoint(340, 130);
		this.cpu_blueshark[0].SetBoundaryWidth(100);
		this.cpu_blueshark[0].SetDirection(this._direction.Left);

		this.cpu_blueshark[1].SetPoint(360, 150);
		this.cpu_blueshark[1].SetBoundaryWidth(100);
		this.cpu_blueshark[1].SetDirection(this._direction.Left);
		
		return;
	}

	this._cpufish = function() {

		this.cpu_fish = new Array(6);

		for (var count = 0; count < this.cpu_fish.length; count++) {

			this.cpu_fish[count] = new _cpu_fish();
			this.cpu_fish[count].playable = this.playable;
			this.cpu_fish[count].Create();
		}

		this.cpu_fish[0].SetSpecies('stripes');
		this.cpu_fish[0].SetPoint(560, 120);
		this.cpu_fish[0].SetBoundaryWidth(50);

		this.cpu_fish[1].SetSpecies('red');
		this.cpu_fish[1].SetPoint(545, 125);
		this.cpu_fish[1].SetBoundaryWidth(40);

		this.cpu_fish[2].SetSpecies('risingsun');
		this.cpu_fish[2].SetPoint(550, 130);
		this.cpu_fish[2].SetBoundaryWidth(40);

		this.cpu_fish[3].SetSpecies('stripes');
		this.cpu_fish[3].SetPoint(550, 150);
		this.cpu_fish[3].SetBoundaryWidth(55);

		this.cpu_fish[4].SetSpecies('red');
		this.cpu_fish[4].SetPoint(545, 155);
		this.cpu_fish[4].SetBoundaryWidth(55);

		this.cpu_fish[5].SetSpecies('risingsun');
		this.cpu_fish[5].SetPoint(560, 160);
		this.cpu_fish[5].SetBoundaryWidth(55);

		return;
	}

	this._cpuglyph = function() {

		this.cpu_glyph = new Array(1);

		this.cpu_glyph[0] = new _cpu_glyph();
		this.cpu_glyph[0].playable = this.playable;
		this.cpu_glyph[0].Create();
		
		this.cpu_glyph[0].SetPoint(588, 110);
		this.cpu_glyph[0].SetId('hercules');
		this.cpu_glyph[0].SetDirection(this._direction.Left);

		this.cpu_glyph[0].text = Array(2); 
		this.cpu_glyph[0].text[0] = "HOLOGRAM";
		this.cpu_glyph[0].text[1] = "NEVER WASTE WHAT YOU FIND,\nIF YOU HAVE CONVENTIONAL";
		this.cpu_glyph[0].text[1]+= " MEANS\nOF SOLVING A PROBLEM YOU'RE\nPROBABLY BETTER OFF.";

		return;
	}

	this._projectileconsumable = function() {

		this.projectile_consumable = new Array(2);

		this.projectile_consumable[0] = new _projectile_consumable();
		this.projectile_consumable[0].playable = this.playable;
		this.projectile_consumable[0].Create(this._consumable.Laser);
		this.projectile_consumable[0].SetPoint(585, 100);
		this.projectile_consumable[0].total = 1;

		this.projectile_consumable[1] = new _projectile_consumable();
		this.projectile_consumable[1].playable = this.playable;
		this.projectile_consumable[1].Create(this._consumable.Coin);
		this.projectile_consumable[1].SetPoint(570, 150);
		this.projectile_consumable[1].total = 1;

		return;
	}
}

function _level001_block106() {

	this.id = 106;

	this._state = new _core_state();
	this._direction = new _core_direction();
	this._consumable = new _core_consumable();	

	this.playable = null;
	this.display_manager = null;
	this.hud_manager = null;

	this.InBoundary = _core_block_inboundary;
	this.Process = _core_block_process;
	this.Update = _core_block_update;

	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;

	this.background = null;
	this.boundary = null;
	this.surface_boundary = null;

	this.cpu_airplant = null;
	this.cpu_bluejelly = null;
	this.cpu_blueshark = null;
	this.cpu_dolphin = null;
	this.cpu_fish = null;
	this.cpu_glyph = null;
	this.cpu_moirae = null;
	this.projectile_consumable = null;

	this.Destroy = function() {

		this.x = 0; this.y = 0;
		this.w = 0; this.h = 0;

		this.background = null;
		this.boundary = null;
		this.surface_boundary = null;

		this.cpu_airplant = null;
		this.cpu_bluejelly = null;
		this.cpu_blueshark = null;
		this.cpu_dolphin = null;
		this.cpu_fish = null;
		this.cpu_glyph = null;
		this.cpu_moirae = null;
		this.projectile_consumable = null;

		return;
	}

	this.Create = function() {

		this.display_manager = this.playable.display_manager;
		this.hud_manager = this.playable.hud_manager;

		this.x = 0; this.y = 0;
		this.w = 960; this.h = 240;

		this.background = new Image();
		this.background.src = 'agartha/block-106.png';

		this._cpumoirae();
		this._boundary();

		return;
	}

	this._boundary = function() {

		this.boundary = new Array(4);

		for (var count = 0; count < this.boundary.length; count++)
			this.boundary[count] = new Rectangle(0, 0, 0, 0);

		this.boundary[0].setRectangle(0, 0, 1, 240);
		this.boundary[1].setRectangle(640, 0, 1, 240);
		this.boundary[2].setRectangle(0, 0, 640, 1);
		this.boundary[3].setRectangle(0, 240, 640, 1);

		return;
	}

	this._cpumoirae = function() {

		this.cpu_moirae = new Array(2);

		for (var count = 0; count < this.cpu_moirae.length; count++) {

			this.cpu_moirae[count] = new _cpu_moirae();
			this.cpu_moirae[count].playable = this.playable;
			this.cpu_moirae[count].Create();
		}

		this.cpu_moirae[0].SetPoint(300, 0);
		this.cpu_moirae[0].SetDirection(this._direction.Left);

		this.cpu_moirae[1].SetPoint(300, 0);
		this.cpu_moirae[1].SetDirection(this._direction.Left);
		this.cpu_moirae[1].health = 3;
		this.cpu_moirae[1].delay_createlaser.total = 100;
		this.cpu_moirae[1].delay_move.total = 6;
		
		return;
	}
}
function _level001() {

	this._state = new _core_state();
	this._direction = new _core_direction();	
	this._consumable = new _core_consumable();

	this.id = 001;
	this.state = this._state.Purge;

	this.flag_secondary = false;
	this.flag_requirement = false;

	this.playable = null;
	this.display_manager = null;
	this.viewport_manager = null;
	this.hud_manager = null;

	this.blink = false;
	this.delay_blink = null;
	this.loading = null;

	this.quadrant = null;
	this.primary = null;
	this.secondary = null;

	this.primary_parallax = null;
	this.secondary_parallax = null;

	this.surface_index = 0;
	this.surface = null;	
	this.delay_surface = null;
	this.delay_complete = null;

	this.SetState = _core_method_setstate;

	this.Destroy = function() {

		this.flag_secondary = false;
		this.flag_requirement = false;

		this.display_manager = null;
		this.viewport_manager = null;
		this.hud_manager = null;

		this.blink = false;
		this.delay_blink = null;
		this.loading = null;

		this.quadrant = null;
		this.primary = null;
		this.secondary = null;

		this.primary_parallax = null;
		this.secondary_parallax = null;

		this.surface_index = 0;
		this.surface = null;	
		this.delay_surface = null;
		this.delay_complete = null;

		return;
	}

	this.Create = function() {

		this.display_manager = this.playable.display_manager;
		this.viewport_manager = this.playable.viewport_manager;
		this.hud_manager = this.playable.hud_manager;

		this.flag_secondary = false;
		this.flag_requirement = false;

		this.loading = new Image();
		this.loading.src = 'agartha/loading-1.png';

		this.blink = false;
		this.delay_blink = new Delay(0, 50);

		this.LoadBlock();
		this.surface_index = 0;
		this.surface = new Array(2);

		this.surface[0] = new Image();
		this.surface[0].src = 'agartha/surface-1.png';
		this.surface[1] = new Image();
		this.surface[1].src = 'agartha/surface-2.png';

		this.delay_surface = new Delay(0, 30);
		this.delay_complete = new Delay(0, 200);
		return;	
	}

	this.LoadBlock = function() {

		this.quadrant = new Array(4);
		this.primary = new Array(6);

		this.primary[0] = new _level001_block100();
		this.primary[1] = new _level001_block101();
		this.primary[2] = new _level001_block102();
		this.primary[3] = new _level001_block103();
		this.primary[4] = new _level001_block104();
		this.primary[5] = new _level001_block105();

		for (var count = 0; count < this.primary.length; count++) {
			this.primary[count].playable = this.playable;
			this.primary[count].Create();
		}

		this.primary_parallax = new Image();
		this.primary_parallax.src = 'agartha/background-001.png';

		this.secondary = new Array(1);
		this.secondary[0] = new _level001_block106();
		this.secondary[0].playable = this.playable;
		this.secondary[0].Create();

		this.secondary_parallax = new Image();
		this.secondary_parallax.src = 'agartha/secondary-001.png';

		return;
	}

	this.PrimaryDispatch = function() {

		this.Create();

		this.viewport_manager.SetWorldSize(640, 720);
		this.viewport_manager.SetPoint(0, 480);

		this.playable.SetPoint(10, 590);
		this.viewport_manager.preceding.setRectangle(
			this.playable.current.x, this.playable.current.y, 0, 0);

		this.playable.SetDirection(this._direction.Right);
		this.hud_manager.inventory[this._consumable.Coin] = 0;

		$('#title').html("HALF MOON BAY");
		jukebox.play("crestoe-caverns-of-the-forgotton.mp3");

		this.hud_manager.dialog = null;
		this.hud_manager.delay_dialog.count = 0;

		this.SetState(this._state.Loading);
		return;
	}

	this.UpdateLoad = function() {

		this.display_manager.logical_display
		.drawImage(this.loading, 0, 0);

		if (this.delay_blink.Process() == false) {

			if (this.blink == true) this.blink = false;
				else this.blink = true;
		}

		if (this.blink == true) FillRect(80, 100, 160, 20, "#000000");

		if ((this.primary_parallax.complete == false) ||
			(this.secondary_parallax.complete == false))
				return false;

		for (var count = 0; count < this.primary.length; count++)
			if (this.primary[count].background.complete == false)
				return;
		for (var count = 0; count < this.secondary.length; count++)
			if (this.secondary[count].background.complete == false)
				return;

		if (this.delay_complete.Process() == true)
			return;

		this.SetState(this._state.Summary);
		return;
	}

	this.DisplaySummary = function() {

		var text = new Array(3);
		text[0] = "HALF MOON BAY";

		text[1] = "\nCONTROLS \n\n";
		text[1]+= "W > UP, A > LEFT, S > DOWN,\nD > RIGHT,";
		text[1]+= "\n\nI > INVENTORY, J > SONAR,\nK > TOGGLE ITEM, L > USE ITEM.";

		text[2] = "A SECLUDED BEACH WITH WARM WATER,\nTEAMING WITH LIFE AND RESOURCES";
		text[2]+= "\nFOR A SMALL POD. THE WATER IS\nCRYSTAL CLEAR WITH CORAL,";
		text[2]+= "SPONGES\nAND EXOTIC FISH OF VARIOUS\nCOLORS.\n\nTHE ONLY DANGERS";
		text[2]+= " LURKING ABOUT\nARE SHARKS AND JELLYFISH.";

		this.hud_manager.DispatchMessage(text);
		this.SetState(this._state.Normal);
		return;
	}

	this.SecondaryDispatch = function() {

		this.flag_secondary = true;

		this.viewport_manager.SetWorldSize(640, 240);
		this.viewport_manager.SetPoint(0, 0);

		this.playable.SetPoint(30, 30);
		this.viewport_manager.preceding.setRectangle(this.playable.current.x,
			this.playable.current.y, 0, 0);

		this.playable.SetDirection(this._direction.Right);
		this.hud_manager.inventory[this._consumable.Coin] = 0;
		jukebox.play("crestoe-unsettling-waters-(ocean-battlefield).mp3");

		this.hud_manager.dialog = null;
		this.hud_manager.delay_dialog.count = 0;

		this.SetState(this._state.Normal);
		return;
	}

	this.RequirementMet = function() {

		if (this.flag_requirement == true)
			return false;

		if (not_equal(this.hud_manager.inventory[this._consumable.Coin], 5))
			return false;

		this.primary[3].cpu_glyph[0].text[1] = "A TRAIL AWAITS YOU KUROS,";
		this.primary[3].cpu_glyph[0].text[1]+= " GOOD\nLUCK!";
		this.primary[3].boundary[0].setRectangle(0, 0, 0, 0);

		this.flag_requirement = true;
		return true;
	}

	this.InBoundExit = function() {

		if (this.flag_secondary == true)
			return false;

		if (this.playable.state == this._state.Purge)
			return false;
		if (this.playable.state == this._state.Burst)
			return false;

		if (this.playable.InBound(new Rectangle(0, 0,
			this.viewport_manager.WorldWidth,
			this.viewport_manager.WorldHeight)) == false)
	
		if (this.playable.InBound(new Rectangle(640, 540, 20, 60)) == true) {

			this.SetState(this._state.Secondary);
			return true;
		}

		return false;
	}

	this.CompletionMet = function() {

		if (this.flag_secondary == false)
			return false;

		var cpu_moirae = this.secondary[0].cpu_moirae;
		if (not_equal(cpu_moirae[0].state, cpu_moirae[0]._state.Purge)) return false;
		if (not_equal(cpu_moirae[1].state, cpu_moirae[1]._state.Purge)) return false;

		if (this.delay_complete.Process() == true)
			return false;

		if (this.playable.state == this._state.Purge)
			return false;
		if (this.playable.state == this._state.Burst)
			return false;

		this.hud_manager.SetConsumable(this._consumable.MegaBomb, 2);

		this.playable.breath = 3;
		this.playable.current_level = 502;

		this.SetState(this._state.Purge);
		return true;
	}

	this.SurfaceBoundary = function(quadrant) {

		if (quadrant.surface_boundary == null)
			return false;

		if (this.delay_surface.Process() == false)
			if (this.surface_index == 1) this.surface_index = 0;
				else this.surface_index = 1;

		this.display_manager.drawImage(this.surface[this.surface_index],
			quadrant.surface_boundary.x,
			quadrant.surface_boundary.y);

		if (not_equal(quadrant.cpu_bluejelly, null) == true)
			for (var count = 0; count < quadrant.cpu_bluejelly.length; count++) {

			if (not_equal(quadrant.cpu_bluejelly[count].state, this._state.Purge) == true)
				if (quadrant.cpu_bluejelly[count].InBound(quadrant.surface_boundary) == true)
					quadrant.cpu_bluejelly[count].SetState(this._state.Purge);
		}

		if (this.playable.state == this._state.Purge)
			return false;
		if (this.playable.state == this._state.Burst)
			return false;

		if (this.playable.InBound(quadrant.surface_boundary) == true)
			if (this.playable.breath < 6) this.playable.breath++;

		return true;
	}

	this.GetQuadrant = function() {

		var handle = null;
		var viewport_boundary = null, handle_boundary = null;

		for (var count = 0; count < this.quadrant.length; count++)
			this.quadrant[count] = null;

		if (this.flag_secondary == true) handle = this.secondary;
			else handle = this.primary;

		for (var count = 0, index = 0; count < handle.length; count++) {

			if (index > this.quadrant.length) break;

			viewport_boundary = new Rectangle(this.viewport_manager.x,
				this.viewport_manager.y,
				this.viewport_manager.w,
				this.viewport_manager.h);

			handle_boundary = new Rectangle(handle[count].x,
				handle[count].y, handle[count].w, handle[count].h);

			if (InBound(viewport_boundary, handle_boundary) == true) {
				this.quadrant[index] = handle[count];
				index++;
			}
		}

		return;
	}

	this.DrawBackground = function() {

		for (var count = 0; count < this.quadrant.length; count++) { 
			if (this.quadrant[count] == null) break;

			display.drawImage(this.quadrant[count].background,
				this.quadrant[count].x, this.quadrant[count].y);
		}

		return;
	}

	this.DrawParallax = function() {

		if (this.flag_secondary == true) {
			display.logical_display .drawImage(this.secondary_parallax,
				0, parseInt(this.viewport_manager.y*-0.5));
			return; }

		display.logical_display.drawImage(this.primary_parallax,
			0, parseInt(this.viewport_manager.y*-0.5));
		return;
	}

	this.Process = function() {

		switch (this.state) { case this._state.Purge: {
			this.PrimaryDispatch(); return; }

		case this._state.Secondary: {
			this.SecondaryDispatch(); return; }

		case this._state.Loading: {
			this.UpdateLoad(); return; }

		case this._state.Summary:
			this.DisplaySummary(); }

		this.GetQuadrant();
		this.DrawParallax();
		this.DrawBackground();
		
		this.playable.Process();
		for (var count = 0; count < this.quadrant.length; count++)
			if (not_equal(this.quadrant[count], null))
				this.quadrant[count].Process();

		this.playable.Update();
		for (var count = 0; count < this.quadrant.length; count++)
			if (not_equal(this.quadrant[count], null))
				this.quadrant[count].Update();

		for (var count = 0; count < this.quadrant.length; count++)
			if (not_equal(this.quadrant[count], null))
				this.SurfaceBoundary(this.quadrant[count]);

		this.viewport_manager.UpdatePosition();
		this.hud_manager.Draw();

		this.RequirementMet();
		this.InBoundExit();
		this.CompletionMet();
		
		return;
	}
}

function _level002() {

	this._state = new _core_state();
	this._direction = new _core_direction();	
	this._consumable = new _core_consumable();

	this.id = 002;
	this.state = this._state.Purge;

	this.flag_secondary = false;
	this.flag_requirement = false;

	this.playable = null;
	this.display_manager = null;
	this.viewport_manager = null;
	this.hud_manager = null;

	this.blink = false;
	this.delay_blink = null;
	this.loading = null;

	this.quadrant = null;
	this.primary = null;
	this.secondary = null;

	this.primary_parallax = null;
	this.secondary_parallax = null;

	this.surface_index = 0;
	this.surface = null;	
	this.delay_surface = null;
	this.delay_complete = null;

	this.SetState = _core_method_setstate;

	this.Destroy = function() {

		this.flag_secondary = false;
		this.flag_requirement = false;

		this.display_manager = null;
		this.viewport_manager = null;
		this.hud_manager = null;

		this.blink = false;
		this.delay_blink = null;
		this.loading = null;

		this.quadrant = null;
		this.primary = null;
		this.secondary = null;

		this.primary_parallax = null;
		this.secondary_parallax = null;

		this.surface_index = 0;
		this.surface = null;	
		this.delay_surface = null;
		this.delay_complete = null;

		return;
	}

	this.Create = function() {

		this.display_manager = this.playable.display_manager;
		this.viewport_manager = this.playable.viewport_manager;
		this.hud_manager = this.playable.hud_manager;

		this.flag_secondary = false;
		this.flag_requirement = false;

		this.loading = new Image();
		this.loading.src = 'agartha/loading-1.png';

		this.blink = false;
		this.delay_blink = new Delay(0, 50);

		this.LoadBlock();
		this.surface_index = 0;
		this.surface = new Array(2);

		this.surface[0] = new Image();
		this.surface[0].src = 'agartha/surface-1.png';
		this.surface[1] = new Image();
		this.surface[1].src = 'agartha/surface-2.png';

		this.delay_surface = new Delay(0, 30);
		this.delay_complete = new Delay(0, 200);
		return;	
	}

	this.LoadBlock = function() {

		this.quadrant = new Array(4);
		this.primary = new Array(8);

		this.primary[0] = new _level002_block200();
		this.primary[1] = new _level002_block201();
		this.primary[2] = new _level002_block206();
		this.primary[3] = new _level002_block207();
		this.primary[4] = new _level002_block212();
		this.primary[5] = new _level002_block213();
		this.primary[6] = new _level002_block218();
		this.primary[7] = new _level002_block219();

		for (var count = 0; count < this.primary.length; count++) {
			this.primary[count].playable = this.playable;
			this.primary[count].Create();
		}

		this.primary_parallax = new Image();
		this.primary_parallax.src = 'agartha/primary-002.png';

		this.secondary = new Array(1);
		this.secondary[0] = new _level001_block106();
		this.secondary[0].playable = this.playable;
		this.secondary[0].Create();

		this.secondary_parallax = new Image();
		this.secondary_parallax.src = 'agartha/secondary-001.png';

		return;
	}

	this.PrimaryDispatch = function() {

		this.Create();

		this.viewport_manager.SetWorldSize(1920, 960); // (1920/parallax_width)
		this.viewport_manager.SetPoint(0, 480);

		this.playable.SetPoint(10, 590);
		this.viewport_manager.preceding.setRectangle(
			this.playable.current.x, this.playable.current.y, 0, 0);

		this.playable.SetDirection(this._direction.Right);
		this.hud_manager.inventory[this._consumable.Coin] = 0;

		$('#title').html("THE PHONEGRA ARCHIPELAGO");
		jukebox.play("crestoe-the-dreamers-labyrinth.mp3");

		this.hud_manager.dialog = null;
		this.hud_manager.delay_dialog.count = 0;

		this.SetState(this._state.Loading);
		return;
	}

	this.UpdateLoad = function() {

		this.display_manager.logical_display
		.drawImage(this.loading, 0, 0);

		if (this.delay_blink.Process() == false) {

			if (this.blink == true) this.blink = false;
				else this.blink = true;
		}

		if (this.blink == true) FillRect(80, 100, 160, 20, "#000000");

		if ((this.primary_parallax.complete == false) ||
			(this.secondary_parallax.complete == false))
				return false;

		for (var count = 0; count < this.primary.length; count++)
			if (this.primary[count].background.complete == false)
				return;
		for (var count = 0; count < this.secondary.length; count++)
			if (this.secondary[count].background.complete == false)
				return;

		if (this.delay_complete.Process() == true)
			return;

		this.SetState(this._state.Summary);
		return;
	}

	this.DisplaySummary = function() {

		var text = new Array(2);
		text[0] = "THE PHONEGRA ARCHIPELAGO";

		text[1] = "SEVERAL SMALL ISLANDS SCATTER\nTHE OUTER RIM OF THE MAIN";
		text[1]+= "\nCONTINENT. A GREAT REEF PROVIDES\nA DIVERSE ECOSYSTEM";
		text[1]+= " OF PLANT AND\nFISH LIFE. WITH THE ABUNDANCE OF\nFOOD,";
		text[1]+= " IT IS THE IDEAL LOCATION\nFOR A SMALL POD.";

		this.hud_manager.DispatchMessage(text);
		this.SetState(this._state.Normal);
		return;
	}

	this.SecondaryDispatch = function() {

		this.flag_secondary = true;

		this.viewport_manager.SetWorldSize(640, 240);
		this.viewport_manager.SetPoint(0, 0);

		this.playable.SetPoint(30, 30);
		this.viewport_manager.preceding.setRectangle(this.playable.current.x,
			this.playable.current.y, 0, 0);

		this.playable.SetDirection(this._direction.Right);
		this.hud_manager.inventory[this._consumable.Coin] = 0;
		jukebox.play("crestoe-unsettling-waters-(ocean-battlefield).mp3");

		this.hud_manager.dialog = null;
		this.hud_manager.delay_dialog.count = 0;

		this.SetState(this._state.Normal);
		return;
	}

	this.RequirementMet = function() {

		if (this.flag_requirement == true)
			return false;

		if (not_equal(this.hud_manager.inventory[this._consumable.Coin], 5))
			return false;

		this.primary[3].cpu_glyph[0].text[1] = "A TRAIL AWAITS YOU KUROS,";
		this.primary[3].cpu_glyph[0].text[1]+= " GOOD\nLUCK!";
		this.primary[3].boundary[0].setRectangle(0, 0, 0, 0);

		this.flag_requirement = true;
		return true;
	}

	this.InBoundExit = function() {

		if (this.flag_secondary == true)
			return false;

		if (this.playable.state == this._state.Purge)
			return false;
		if (this.playable.state == this._state.Burst)
			return false;

		if (this.playable.InBound(new Rectangle(0, 0,
			this.viewport_manager.WorldWidth,
			this.viewport_manager.WorldHeight)) == false)
	
		if (this.playable.InBound(new Rectangle(640, 540, 20, 60)) == true) {

			this.SetState(this._state.Secondary);
			return true;
		}

		return false;
	}

	this.CompletionMet = function() {

		if (this.flag_secondary == false)
			return false;

		var cpu_moirae = this.secondary[0].cpu_moirae;
		if (not_equal(cpu_moirae[0].state, cpu_moirae[0]._state.Purge)) return false;
		if (not_equal(cpu_moirae[1].state, cpu_moirae[1]._state.Purge)) return false;

		if (this.delay_complete.Process() == true)
			return false;

		if (this.playable.state == this._state.Purge)
			return false;
		if (this.playable.state == this._state.Burst)
			return false;

		this.hud_manager.SetConsumable(this._consumable.MegaBomb, 2);

		this.playable.breath = 3;
		this.playable.current_level = 502;

		this.SetState(this._state.Purge);
		return true;
	}

	this.SurfaceBoundary = function(quadrant) {

		if (quadrant.surface_boundary == null)
			return false;

		if (this.delay_surface.Process() == false)
			if (this.surface_index == 1) this.surface_index = 0;
				else this.surface_index = 1;

		this.display_manager.drawImage(this.surface[this.surface_index],
			quadrant.surface_boundary.x,
			quadrant.surface_boundary.y);

		if (not_equal(quadrant.cpu_bluejelly, null) == true)
			for (var count = 0; count < quadrant.cpu_bluejelly.length; count++) {

			if (not_equal(quadrant.cpu_bluejelly[count].state, this._state.Purge) == true)
				if (quadrant.cpu_bluejelly[count].InBound(quadrant.surface_boundary) == true)
					quadrant.cpu_bluejelly[count].SetState(this._state.Purge);
		}

		if (this.playable.state == this._state.Purge)
			return false;
		if (this.playable.state == this._state.Burst)
			return false;

		if (this.playable.InBound(quadrant.surface_boundary) == true)
			if (this.playable.breath < 6) this.playable.breath++;

		return true;
	}

	this.GetQuadrant = function() {

		var handle = null;
		var viewport_boundary = null, handle_boundary = null;

		for (var count = 0; count < this.quadrant.length; count++)
			this.quadrant[count] = null;

		if (this.flag_secondary == true) handle = this.secondary;
			else handle = this.primary;

		for (var count = 0, index = 0; count < handle.length; count++) {

			if (index > this.quadrant.length) break;

			viewport_boundary = new Rectangle(this.viewport_manager.x,
				this.viewport_manager.y,
				this.viewport_manager.w,
				this.viewport_manager.h);

			handle_boundary = new Rectangle(handle[count].x,
				handle[count].y, handle[count].w, handle[count].h);

			if (InBound(viewport_boundary, handle_boundary) == true) {
				this.quadrant[index] = handle[count];
				index++;
			}
		}

		return;
	}

	this.DrawBackground = function() {

		for (var count = 0; count < this.quadrant.length; count++) { 
			if (this.quadrant[count] == null) break;

			display.drawImage(this.quadrant[count].background,
				this.quadrant[count].x, this.quadrant[count].y);
		}

		return;
	}

	this.DrawParallax = function() {

		if (this.flag_secondary == true) {
			display.logical_display .drawImage(this.secondary_parallax,
				0, parseInt(this.viewport_manager.y*-0.5));
			return; }

		display.logical_display.drawImage(this.primary_parallax,
			parseInt(this.viewport_manager.x/-6), parseInt(this.viewport_manager.y/-4));
		return;
	}

	this.Process = function() {

		switch (this.state) { case this._state.Purge: {
			this.PrimaryDispatch(); return; }

		case this._state.Secondary: {
			this.SecondaryDispatch(); return; }

		case this._state.Loading: {
			this.UpdateLoad(); return; }

		case this._state.Summary:
			this.DisplaySummary(); }

		this.GetQuadrant();
		this.DrawParallax();
		this.DrawBackground();
		
		this.playable.Process();
		for (var count = 0; count < this.quadrant.length; count++)
			if (not_equal(this.quadrant[count], null))
				this.quadrant[count].Process();

		this.playable.Update();
		for (var count = 0; count < this.quadrant.length; count++)
			if (not_equal(this.quadrant[count], null))
				this.quadrant[count].Update();

		for (var count = 0; count < this.quadrant.length; count++)
			if (not_equal(this.quadrant[count], null))
				this.SurfaceBoundary(this.quadrant[count]);

		this.viewport_manager.UpdatePosition();
		this.hud_manager.Draw();

		this.RequirementMet();
		this.InBoundExit();
		this.CompletionMet();
		
		return;
	}
}


function _level500() {

	this.playable = null;
	this.display_manager = null;
	this.blink = false;

	this.background = null;
	this.delay_blink = null;
	this.delay_prologue = null;

	this.Destroy = function() {

		this.blink = false;

		this.background = null;
		this.delay_blink = null;
		this.delay_prologue = null;
		
		return;
	}

	this.Create = function() {

		this.blink = false;

		this.display_manager = this.playable.display_manager;
		this.background = new Image();
		this.background.src = 'agartha/segment-000.png';

		this.delay_blink = new Delay(0, 50);
		this.delay_prologue = new Delay(0, 1000);

		$('#title').html("AGARTHA 2.1");
		jukebox.play("crestoe-sea-of-peril.mp3");

		return;
	}

	this.Draw = function() {

		FillRect(0, 0, 320, 240, "#000000");
		this.display_manager.logical_display.drawImage(this.background, 0, 0);

		return;
	}

	this.Process = function() {

		this.Draw();
			
		if (this.delay_blink.Process() == false)
		{	if (this.blink == true) this.blink = false;
				else this.blink = true; }
		
		if (this.blink == true)
			FillRect(80, 170, 160, 10, "#000000");

		if (this.delay_prologue.Process() == false) {

			this.playable.current_level = 501;
			return;
		}

		if (keyboard.enter == true) {

			this.playable.current_level = 001;
			return;
		}

		return;
	}
}

function _level501() {

	this.y = 0;

	this.playable = null;
	this.display_manager = null;
	this.background = null;
	this.delay = null;

	this.Destroy = function() {

		this.y = 0;

		this.background = null;
		this.delay = null;

		return;
	}

	this.Create = function() {

		this.y = 240;

		this.display_manager = this.playable.display_manager;
		this.background = new Image();
		this.background.src = 'agartha/segment-001.png';
		this.delay = new Delay(0, 8);

		return;
	}

	this.Process = function() {

		FillRect(0, 0, 320, 240, "#000000");

		if (this.delay.Process() == false) this.y--;	
		this.display_manager.logical_display.drawImage(this.background, 0, this.y);
		
		if (this.y == -650) {

			this.y = 240;
			this.playable.current_level = 500;
			return;
		}

		return;
	}
}

function _level502() {

	this.y = 0;

	this.playable = null;
	this.display_manager = null;
	this.background = null;
	this.delay = null;

	this.Destroy = function() {

		this.y = 0;

		this.background = null;
		this.delay = null;

		return;
	}

	this.Create = function() {

		this.y = 240;

		this.display_manager = this.playable.display_manager;
		this.background = new Image();
		this.background.src = 'agartha/segment-002.png';
		this.delay = new Delay(0, 8);

		return;
	}

	this.Dispatch = function() { $('#title').html("EPILOGUE"); }

	this.Process = function() {

		if (this.y == 240) this.Dispatch();

		FillRect(0, 0, 320, 240, "#000000");

		if (this.delay.Process() == false) this.y--;	
		this.display_manager.logical_display.drawImage(this.background, 0, this.y);
		
		if (this.y == -400) {

			this.y = 240;
			this.playable.current_level = 500;
			return;
		}

		return;
	}
}

function _core_main() {

	this._state = new _core_state();

	this.playable = null;
	this.display_manager = null;
	this.viewport_manager = null;
	this.hud_manager = null;

	this.index = 0; this.handle = null;
	this.delay_restore = null;

	this.Create = function() {

		this.playable = new _playable_moirae();
		this.playable.Dispatch();

		this.display_manager = this.playable.display_manager;
		this.hud_manager = this.playable.hud_manager;
		display = this.display_manager;
		
		this.LoadLevel();
		this.delay_restore = new Delay(0, 200);

		this.playable.health = 3;
		this.playable.breath = 3;
		this.playable.current_level = 500;

		return;
	}

	this.LoadLevel = function() {

		this.handle = new Array(5);

		this.handle[0] = new _level500();
		this.handle[0].playable = this.playable;
		this.handle[0].Create();

		this.handle[1] = new _level501();
		this.handle[1].playable = this.playable;
		this.handle[1].Create();

		this.handle[2] = new _level502();
		this.handle[2].playable = this.playable;
		this.handle[2].Create();

		this.handle[3] = new _level001();
		this.handle[3].playable = this.playable;

		this.handle[4] = new _level002();
		this.handle[4].playable = this.playable;

		return;
	}

	this.Process = function() {
	
		if (this.playable == null) { this.Create(); return; }
		if (display == null) return;

		if (this.playable.health == 0) this.RestorePlayable();

		this.hud_manager.ProcessInstruction();
	
		switch (this.playable.current_level) {

			case 500: this.index = 0;
				break;
			case 501: this.index = 1;
				break;
			case 502: this.index = 2;
				break;

			case 001: this.index = 3;
				break;
			case 002: this.index = 4;
				break;
		}

		this.handle[this.index].Process();

		this.hud_manager.UpdateMessage();
		this.display_manager.Draw();

		return;
	}

	this.RestorePlayable = function() {

		if (this.delay_restore.Process() == true)
			return;

		this.playable.Create();
		this.playable.SetState(this._state.Normal);

		this.playable.health = 3;
		this.playable.breath = 3;

		this.hud_manager.dialog = null;
		this.hud_manager.delay_dialog.count = 0;

		this.handle[this.index].SetState(this._state.Purge);
		return;
	}
}

var _main = new _core_main();
setInterval(function() { _main.Process(); }, 15);
