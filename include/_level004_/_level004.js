function _level004() {

	this._state = new _core_state();
	this._direction = new _core_direction();	
	this._consumable = new _core_consumable();

	this.id = 004;
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
		this.primary = new Array(24);

		this.primary[0] = new _level004_block400();
		this.primary[1] = new _level004_block401();
		this.primary[2] = new _level004_block402();
		this.primary[3] = new _level004_block403();
		this.primary[4] = new _level004_block404();
		this.primary[5] = new _level004_block405();
		this.primary[6] = new _level004_block406();
		this.primary[7] = new _level004_block407();
		this.primary[8] = new _level004_block408();
		this.primary[9] = new _level004_block409();
		this.primary[10] = new _level004_block410();
		this.primary[11] = new _level004_block411();
		this.primary[12] = new _level004_block412();
		this.primary[13] = new _level004_block413();
		this.primary[14] = new _level004_block414();
		this.primary[15] = new _level004_block415();
		this.primary[16] = new _level004_block416();
		this.primary[17] = new _level004_block417();
		this.primary[18] = new _level004_block418();
		this.primary[19] = new _level004_block419();
		this.primary[20] = new _level004_block420();
		this.primary[21] = new _level004_block421();
		this.primary[22] = new _level004_block422();
		this.primary[23] = new _level004_block423();

		for (var count = 0; count < this.primary.length; count++) {
			this.primary[count].playable = this.playable;
			this.primary[count].Create();
		}

		this.primary_parallax = new Image();
		this.primary_parallax.src = 'agartha/primary-004.png';

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

		this.viewport_manager.SetWorldSize(1280, 1440); // (world.w/320)-((parallax.w-320)/320)
		this.viewport_manager.SetPoint(0, 0);

		this.playable.SetPoint(10, 100);
		this.viewport_manager.preceding.setRectangle(
			this.playable.current.x, this.playable.current.y, 0, 0);

		this.playable.SetDirection(this._direction.Right);
		this.hud_manager.inventory[this._consumable.Coin] = 0;

		$('#title').html("OBSCURE PASSAGES");
		jukebox.play("crestoe-the-dreamers-labyrinth");

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
		text[0] = "OBSCURE PASSAGES";

		text[1] = "A LARGE MAZE FILLED WITH HUNGRY\nPREDATORS THAT";
		text[1]+= " TAKE ADVANTAGE\nOF TRAVELERS WHOM DARE ENTER.";
		text[1]+= "\nTHE ONLY EXIT TO THE SEAS BEYOND\nEXISTS DEEP BELOW";

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
			parseInt(this.viewport_manager.x/-3), parseInt(this.viewport_manager.y/-5));
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

