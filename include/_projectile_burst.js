
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
