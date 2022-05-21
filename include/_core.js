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

	this.FillRect = function(x, y, w, h, color) {

		var current = this.viewport_manager.TranslateToViewport(new Rectangle(x, y, 0, 0));

		this.logical_display.fillStyle = color;
		this.logical_display.fillRect(current.x, current.y, w , h);
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

	this.device = document.createElement('audio');

	this.play = function(id) {

		if (this.device.canPlayType == null) return;

		this.device.pause(); this.device = null;
		this.device = document.createElement('audio');

		if (not_equal(this.device.canPlayType('audio/mpeg'), ''))
			this.device.setAttribute('src', 'agartha/'+id+'.mp3');

		else return;

		this.device.setAttribute('autoplay', 'autoplay');
		this.device.setAttribute('loop', 'loop');
		this.device.play();
		return;
	}
}
