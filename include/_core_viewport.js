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
