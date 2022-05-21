function _level910() {

	this._state = new _core_state();
	this._direction = new _core_direction();	
	this._consumable = new _core_consumable();

	this.id = 910;
	this.state = this._state.Purge;

	this.playable = null;
	this.display_manager = null;
	this.viewport_manager = null;
	this.hud_manager = null;

	this.blink = false;
	this.delay_blink = null;
	this.loading = null;

	this.quadrant = null;
	this.primary = null;
	this.primary_parallax = null;

	this.surface_index = 0;
	this.surface = null;	
	this.delay_surface = null;
	this.delay_complete = null;

	this.SetState = _core_method_setstate;

	this.Destroy = function() {

		this.display_manager = null;
		this.viewport_manager = null;
		this.hud_manager = null;

		this.blink = false;
		this.delay_blink = null;
		this.loading = null;

		this.quadrant = null;
		this.primary = null;
		this.primary_parallax = null;

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

		this.glyph = new Array(4);
		for (var count = 0; count < this.glyph.length; count++)
			this.glyph[count] = new Image();

		this.glyph[0].src = 'agartha/crystal-1.png';
		this.glyph[1].src = 'agartha/crystal-2.png';
		this.glyph[2].src = 'agartha/crystal-3.png';
		this.glyph[3].src = 'agartha/crystal-4.png';		

		this.delay_surface = new Delay(0, 30);
		this.delay_complete = new Delay(0, 200);
		return;	
	}

	this.LoadBlock = function() {

		this.quadrant = new Array(4);

		this.primary = new Array(1);
		this.primary[0] = new _level910_block9100();

		for (var count = 0; count < this.primary.length; count++) {
			this.primary[count].playable = this.playable;
			this.primary[count].Create();
		}

		this.primary_parallax = new Image();
		this.primary_parallax.src = 'agartha/primary-002.png';

		return;
	}

	this.PrimaryDispatch = function() {

		this.Create();

		this.viewport_manager.SetWorldSize(320, 240);
		this.viewport_manager.SetPoint(0, 0);

		this.playable.SetPoint(0, 100);
		this.viewport_manager.preceding.setRectangle(
			this.playable.current.x, this.playable.current.y, 0, 0);

		this.playable.SetDirection(this._direction.Right);
		this.hud_manager.inventory[this._consumable.Coin] = 0;

		$('#title').html("LEVEL SELECT");
		jukebox.play("crestoe-levian-technology");

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

		if (this.primary_parallax.complete == false)
			return false;

		if (this.delay_complete.Process() == true)
			return;

		this.SetState(this._state.Summary);
		return;
	}

	this.DisplaySummary = function() {

		var text = new Array(2);
		text[0] = "LEVEL SELECT";
		text[1] = "WELCOME TO THE LEVEL SELECT,\nPLEASE CHOOSE A GLYPH."

		this.hud_manager.DispatchMessage(text);
		this.SetState(this._state.Normal);
		return;
	}

	this.InBoundExit = function() {

		if (this.playable.state == this._state.Purge)
			return false;
		if (this.playable.state == this._state.Burst)
			return false;

		if (this.playable.InBound(new Rectangle(76, 100, 24, 24)) == true)
			this.playable.current_level = 001;
		if (this.playable.InBound(new Rectangle(124, 100, 24, 24)) == true)
			this.playable.current_level = 002;
		// if (this.playable.InBound(new Rectangle(172, 100, 24, 24)) == true)
		//	this.playable.current_level = 001;
		if (this.playable.InBound(new Rectangle(220, 100, 24, 24)) == true)
			this.playable.current_level = 004;

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

		handle = this.primary;
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

	this.Process = function() {

		switch (this.state) { case this._state.Purge: {
			this.PrimaryDispatch(); return; }

		case this._state.Loading: {
			this.UpdateLoad(); return; }

		case this._state.Summary:
			this.DisplaySummary(); }

		this.GetQuadrant();
		
		this.playable.Process();
		for (var count = 0; count < this.quadrant.length; count++)
			if (not_equal(this.quadrant[count], null))
				this.quadrant[count].Process();

		this.playable.Update();
		for (var count = 0; count < this.quadrant.length; count++)
			if (not_equal(this.quadrant[count], null))
				this.quadrant[count].Update();

		display.drawImage(this.glyph[0], 76, 100);
		display.drawImage(this.glyph[1], 124, 100);
		display.drawImage(this.glyph[2], 172, 100);
		display.drawImage(this.glyph[3], 220, 100);

		for (var count = 0; count < this.quadrant.length; count++)
			if (not_equal(this.quadrant[count], null))
				this.SurfaceBoundary(this.quadrant[count]);

		this.viewport_manager.UpdatePosition();
		this.hud_manager.Draw();

		this.InBoundExit();
		return;
	}
}

