fx_quick_qty = {
	_construct: function () {
		$buttons = $(".quick-qty");
		$input_qty = $("#Quantity");
		$subtotal = $(".subtotal");
		$product_form = $(".product-form");
		$cart = $(".site-header__cart");
	},

	_changeValueJS: function (el) {
		el_value = el.getAttribute("value");

		$input_qty.val(el_value);
		$input_qty.trigger("change");
	},

	_changeValue: function ($el) {
		el_value = $el.attr("value");

		$input_qty.val(el_value);
	},

	_parseNumber: function (value) {
		if (typeof value == "number") {
			return value;
		}

		return Number(value.replace(/[^0-9\.-]+/g, ""));
	},

	_parseMoney(value) {
		return (
			"$" +
			value
				.toFixed(2)
				.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		);
	},

	_updateSubtotal: function ($qty) {
		price = fxQQ._parseNumber($subtotal.attr("data-price"));
		qty = $qty.val();

		subtotal = fxQQ._parseMoney(price * qty);

		$subtotal.find(".set").text("(" + subtotal + ")");
	},

	_addToCart: function () {
		$.post("/cart/add.js", $('form[action="/cart/add"]').serialize())
			.done(function (data) {
				dataPost = JSON.parse(data);

				//if(data.status == 200 ){
				if (dataPost.hasOwnProperty("id")) {
					fnShowQuickCart.openQuickCart();

					$cart.removeClass("active");
					setTimeout(function () {
						$cart.addClass("active");
					}, 100);

					fxSwitchQty.added(dataPost);
					$("#Quantity").val(0);
				} else {
					/*dataPost = $.parseJSON(data.responseText);
        swal({
          title: dataPost.message,
          text: dataPost.description,
          icon: 'error'
        });*/
					swal({
						title: "Algo salió mal",
						text: dataPost.description,
						icon: "error",
					});
				}
			})
			.fail(function (data) {
				dataPost = JSON.parse(data.responseText);
				swal({
					title: "Lo sentimos",
					text: dataPost.description,
					icon: "error",
				});
			});
	},

	init: function () {
		this._construct();
		fxQQ = this;
		//--

		$buttons.on("click", function () {
			if (!$(this).hasClass("btn--disabled")) {
				fxQQ._changeValueJS(this);
			}
		});

		$input_qty.on("change", function () {
			fxQQ._updateSubtotal($(this));
		});

		$product_form.submit(function (event) {
			event.preventDefault();
			fxQQ._addToCart();
		});
	},
};

fxSwitchQty = {
	reenableButtons: function (total) {
		var $buttons = $(".weight-selector .quick-qty");
		if ($buttons.length > 0) {
			$buttons.each(function () {
				if (total - parseInt($(this).attr("value")) > 0) {
					$(this).removeClass("btn--disabled");
				} else {
					$(this).addClass("btn--disabled");
				}
			});
		}
	},
	updated: function (data) {
		var cartQty = data.quantity;
		var cartId = data.id;
		var productId = $("#ProductSelect-product-template").val();
		var productQty = $("#actualQty");

		if (cartId == productId) {
			var newTotal = parseInt(productQty.attr("max")) - parseInt(cartQty);
			newTotal = newTotal < 0 ? 0 : newTotal;
			productQty.val(newTotal);
			this.reenableButtons(newTotal);
		}
	},
	added: function (data) {
		var cartQty = data.quantity;
		var cartId = data.id;
		var productId = $("#ProductSelect-product-template").val();
		var productQty = $("#actualQty").val();

		if (cartId == productId) {
			var newTotal = parseInt(productQty) - parseInt(cartQty);
			newTotal = newTotal < 0 ? 0 : newTotal;
			$("#actualQty").val(newTotal);
			this.reenableButtons(newTotal);
		}
	},
	removed: function ($el) {
		var cartQty = $el.val();
		var cartId = $el.attr("data-item-id");
		var productId = $("#ProductSelect-product-template").val();
		var productQty = $("#actualQty").val();

		if (cartId == productId) {
			var newTotal = parseInt(productQty) + parseInt(cartQty);
			newTotal =
				newTotal > parseInt($("#actualQty").attr("max"))
					? parseInt($("#actualQty").attr("max"))
					: newTotal;

			$("#actualQty").val(newTotal);
			this.reenableButtons(newTotal);
		}
	},
};

fnShowQuickCart = {
	_constructor: function () {
		$quick_cart_open_btn = $(".site-header__cart");
		$quick_cart_close_btn = $(".quick-cart-close");
		$quick_cart = $(".quick-cart-container");
		$total_price = $(".quick-cart__total-price");
		$quick_cart_body = $(".quick-cart__body");

		$quick_cart_footer = $(".quick-cart__footer");
		$quick_cart_empty = $(".quick-cart__empty");

		$cart_count = $(".site-header__cart-count");
		$quick_cart_box = $(".quick-cart__box");
	},

	_renderQuickCart: function (items, total_price) {
		var itemHTML = "";
		$.each(items, function (index, item) {
			itemHTML += '<div class="quick-cart__item">';
			itemHTML += '<div class="grid grid--uniform grid--no-float">';
			if (item.image != null) {
				itemHTML +=
					'<div class="grid__item one-third"><a href="' +
					item.url +
					'"><img class="img-responsive" src="' +
					item.image +
					'" alt="' +
					item.title +
					'" data-item-url="' +
					item.url +
					'"></a></div>';
			} else {
				itemHTML +=
					'<div class="grid__item one-third"><a href="' +
					item.url +
					'"><img class="img-responsive" src="https://via.placeholder.com/150" data-item-url="' +
					item.url +
					'"></a></div>';
			}
			itemHTML += '<div class="grid__item two-thirds">';
			itemHTML += '<div class="quick-cart__item-title">';
			itemHTML +=
				'<p><a href="' + item.url + '">' + item.product_title + "</a></p>";
			price = parseFloat(item.price / 100);
			price = numeral(price).format("$0,0.00");
			itemHTML +=
				"<p>" +
				price +
				' x <input name="quantity" class="quick-cart__quantity" value="' +
				item.quantity +
				'" data-item-id="' +
				item.id +
				'"></p>';
			itemHTML +=
				'<a href="/cart/change?line=' +
				(index + 1) +
				'&amp;quantity=0" data-item-id="' +
				item.id +
				'" class="quick-cart__remove"><i class="fa fa-times-circle"></i></a>';
			itemHTML += "</div></div></div></div>";
		});

		$quick_cart_body.html(itemHTML);

		if (items.length > 0) {
			$quick_cart_empty.hide();
			total_price = parseFloat(total_price / 100);
			total_price = numeral(total_price).format("$0,0.00");
			$total_price.text(total_price);
			$quick_cart_footer.show();
			$quick_cart_box
				.find("form")
				.after(
					'<div class="shipping-rates-calculator-desktop-container"></div>'
				);
		} else {
			$quick_cart_empty.show();
			$quick_cart_footer.hide();
		}

		fnUpdateQuickCart.init();

		$quick_cart.addClass("open");
		$quick_cart.trigger("open");
	},

	_beforeOpenQuickCart: function () {
		$.ajax({
			url: "/cart.js",
			dataType: "json",
			success: function (response) {
				//console.log(response);
				items = response.items;
				total_price = response.total_price;

				$qty = $cart_count.find("span:first");
				$qty.text(response.items.length);

				fnSQC._renderQuickCart(items, total_price);

				//fnSQC._openQuickCart();
			},
		});
	},

	openQuickCart: function () {
		fnSQC = this;
		this._constructor();

		fnSQC._beforeOpenQuickCart();
	},

	closeQuickCart: function () {
		fnSQC = this;
		this._constructor();

		$quick_cart.removeClass("open");
		$quick_cart.find(".shipping-rates-calculator-desktop-container").remove();
		$quick_cart.find(".cbb-shipping-rates-calculator").remove();
	},

	init: function () {
		fnSQC = this;
		this._constructor();
		var hideTimer = 1;

		$quick_cart_open_btn.on("click", function (event) {
			event.preventDefault();
			fnSQC._beforeOpenQuickCart();
		});

		$quick_cart_close_btn.on("click", function (event) {
			event.preventDefault();
			fnSQC.closeQuickCart();
		});

		$quick_cart.on("open", function () {
			hideTimer = 1;
		});

		$quick_cart_box.on("mouseenter ", function () {
			$quick_cart_box.addClass("active");
		});

		$quick_cart_box.on("mouseleave ", function () {
			$quick_cart_box.removeClass("active");
			hideTimer = 1;
		});

		setInterval(function () {
			if (hideTimer >= 5 && !$quick_cart_box.hasClass("active")) {
				//fnSQC.closeQuickCart();
				hideTimer = 1;
			}
			hideTimer += 1;
		}, 1000);
	},
};

fnUpdateQuickCart = {
	_constructor: function () {
		$quick_cart_remove = $(".quick-cart__remove");
		$quick_cart_quantity = $(".quick-cart__quantity");
		$cart_count = $(".site-header__cart-count");

		$quick_cart_footer = $(".quick-cart__footer");
		$quick_cart_empty = $(".quick-cart__empty");
	},

	_removeItem: function ($this, count) {
		$block = $this.parents(".quick-cart__item");
		$block.css("transform", "translateX(400px)");
		setTimeout(function () {
			$block.remove();
			if (count == 0) {
				$quick_cart_footer.slideUp();
				$quick_cart_empty.fadeIn();
			}
		}, 450);
	},

	_updateCart: function ($this, method) {
		new_qty = method == "update" ? $this.val() : 0;
		item_id = $this.attr("data-item-id");

		$.ajax({
			url: "/cart/change.js",
			data: {
				quantity: new_qty,
				id: item_id,
			},
			dataType: "json",

			success: function (response) {
				total_price = response.total_price;
				total_price = parseFloat(total_price / 100);
				total_price = numeral(total_price).format("$0,0.00");
				$total_price.text(total_price);

				$qty = $cart_count.find("span:first");
				$qty.text(response.items.length);

				if (method == "remove") {
					fxSwitchQty.removed(
						$this
							.parents(".quick-cart__item-title")
							.find(".quick-cart__quantity")
					);
					fnUQC._removeItem($this, response.item_count);
				} else {
					for (i = 0; i < response.items.length; i++) {
						item = response.items[i];
						itemId = item.id;
						itemQty = item.quantity;
						$("input[data-item-id=" + itemId + "]").val(itemQty);
						fxSwitchQty.updated(item);
					}
				}

				swal({
					title: "¡Carrito Actualizado!",
					type: "success",
					timer: 1000,
					showConfirmButton: false,
				});

				$quick_cart_box
					.find("form")
					.after(
						'<div class="shipping-rates-calculator-desktop-container"></div>'
					);
				$quick_cart.find(".cbb-shipping-rates-calculator").remove();
			},

			error: function (response) {
				obj = jQuery.parseJSON(response.responseText);
				console.log(obj.message);
				console.log(obj.description);

				swal({
					title: "¡Ocurrió un error!",
					text: "No se pudo actualizar el carrito, te invitamos a ir directo al carrito para editar tus artículos.",
					type: "warning",
					showConfirmButton: true,
					showCancelButton: true,
					confirmButtonText: "Ir al carrito",
					confirmButtonColor: "#3AC1CC",
					cancelButtonText: "Cancelar",
				}).then(function (isConfirm) {
					if (isConfirm.value) {
						window.location.href = "/cart";
					}
				});
			},
		});
	},

	init: function () {
		this._constructor();
		fnUQC = this;
		var keyUpTimer;

		$quick_cart_remove.on("click", function (event) {
			event.preventDefault();
			fnUQC._updateCart($(this), "remove");
		});

		$quick_cart_quantity.on("keyup", function (e) {
			var $this = $(this);
			var modified = false;
			var secured = false;

			secureKeys = [
				"Backspace",
				"Escape",
				"Enter",
				"ArrowUp",
				"ArrowLeft",
				"ArrowRight",
				"ArrowDown",
				" ",
				"SPACE",
				"Space",
				"CapsLock",
				"Shift",
				"Meta",
				"Alt",
				"Control",
				"Tab",
			];

			modifierKeys = ["Backspace"];

			if (secureKeys.indexOf(e.key) >= 0) secured = true;

			if (modifierKeys.indexOf(e.key) >= 0) modified = true;

			var validate = /^([0-9])$/.test(e.key);

			if (!validate && !secured) {
				e.preventDefault();
			} else {
				if (validate || modified) {
					clearTimeout(keyUpTimer);
					keyUpTimer = setTimeout(function () {
						if ($this.val() != "" || $this.val() < 0) {
							fnUQC._updateCart($this, "update");
						} else {
							fnUQC._updateCart($this, "remove");
						}
					}, 750);
				}
			}
		});
	},
};

fnAddToCartCategories = {
	_construct: function () {
		$product_form = $(".collection-product-form");
		$cart = $(".site-header__cart");
	},

	_addToCart: function ($form) {
		$.post("/cart/add.js", $form.serialize()).always(function (data) {
			dataPost = JSON.parse(data);

			//if(data.status == 200 ){
			if (dataPost.hasOwnProperty("id")) {
				fnShowQuickCart.openQuickCart();

				$cart.removeClass("active");
				setTimeout(function () {
					$cart.addClass("active");
				}, 100);
			} else {
				/*dataPost = $.parseJSON(data.responseText);
        swal({
          title: dataPost.message,
          text: dataPost.description,
          icon: 'error'
        });*/
				swal({
					title: "Algo salió mal",
					text: "Lo sentimos pero la plataforma no funciona correctamente, le invitamos a intentarlo de nuevo más tarde.",
					icon: "error",
				});
			}
		});
	},

	init: function () {
		this._construct();
		fnATCC = this;
		//--

		$product_form.submit(function (event) {
			event.preventDefault();
			fnATCC._addToCart($(this));
		});
	},
};

fnProductTabs = {
	_construct: function () {
		$tabs = $(".tabs-header-container li");
		$tabsContent = $(".tab-content");
	},

	_openTab: function () {
		$tab = $tabs.filter(".active");
		toShow = $tab.attr("data-rel");
		$toShow = $(toShow);
		$toShow.stop().show();
	},

	init: function () {
		this._construct();
		var self = this;

		self._openTab();

		$tabs.on("click", function () {
			$tabs.removeClass("active");
			$(this).addClass("active");
			$tabsContent.stop().hide();
			self._openTab();
		});
	},
};

fnProductCollapses = {
	_construct: function () {
		$collapses = $(".collapse-header");
		$collapsesContent = $(".collapse-content");
	},

	_openCollapse: function () {
		$collapse = $collapses.filter(".active");
		$toOpen = $collapse.next(".collapse-content");
		$toOpen.stop().slideDown();
	},

	init: function () {
		this._construct();
		var self = this;

		self._openCollapse();

		$collapses.on("click", function () {
			shouldOpen = !$(this).hasClass("active");
			$collapses.removeClass("active");
			$collapsesContent.stop().slideUp();
			if (shouldOpen) {
				$(this).addClass("active");
				self._openCollapse();
			}
		});
	},
};

fnRegular = {
	_constructor: function () {
		$regular = $("[regular]");
	},

	_setRegular: function () {
		var self = this;
		self._constructor();

		// --

		$regular.each(function (index) {
			var $el = $(this);
			var groupParams = $el.attr("regular").split(":");
			var childrenClass = "." + groupParams[0];
			var childrenBreakpoint = isNaN(groupParams[1]) ? 0 : groupParams[1];
			var $children = $el.find(childrenClass);
			var windowWidth = $(window).outerWidth();

			var a = 0;
			var b = 0;

			if (windowWidth >= childrenBreakpoint) {
				$children.each(function (j) {
					$children.css("height", "auto");

					a = $(this).outerHeight();

					if (a >= b) {
						b = a;
					}

					$children.css("height", b);
				});
			} else {
				$children.css("height", "auto");
			}
		});
	},

	make: function () {
		var self = this;
		self._constructor();
		var resizeTimerRegular;

		//--

		self._setRegular();

		$(window).on("load", function () {
			self._setRegular();
		});

		$(window).on("resize", function (event) {
			clearTimeout(resizeTimerRegular);
			resizeTimerRegular = setTimeout(() => {
				self._setRegular();
			}, 250);
		});
	},
};

// Function to print markers on map
// Plugin:  Leaflet JS 1.3.4
//var Leaflet = L;
fnMap = {
	_constructor: function () {
		var image;
		var logo;
		var map;
	},

	setMarkers: function (map, locations) {
		// Add markers to the map
		for (var i = 0; i < locations.length; i++) {
			var branch = locations[i];

			var icon = Leaflet.icon({
				iconUrl: image,
				iconSize: [50, 55],
				iconAnchor: [22, 50],
				popupAnchor: [-3, -76],
			});

			var content = branch[3];

			var marker = Leaflet.marker([branch[1], branch[2]], { icon: icon })
				.on("click", function (e) {
					map.setView(this.getLatLng(), 15);
				})
				.addTo(map)
				.bindPopup(content, {
					maxWidth: 370,
				});
		}
	},

	start: function (branches) {
		if (map) {
			map.gestureHandling.disable();
			map.off();
			map.remove();
		}

		map = new Leaflet.Map("map-canvas", {
			center: [19.398239, -99.200262],
			zoom: 11,
			minZoom: 3,
			zoomControl: false,
			gestureHandling: true,
		});

		var attribution =
			'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';

		Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution: attribution,
			subdomains: ["a", "b", "c"],
		}).addTo(map);

		Leaflet.control.zoom().setPosition("bottomright").addTo(map);

		// console.log([...branches.map((b) => [b[1], b[2]])]);

		map.fitBounds([...branches.map((b) => [b[1], b[2]])]);

		fnMap.setMarkers(map, branches);
	},

	pushBranches: function (branches) {
		this._constructor();
		$(".location").each(function () {
			_this = $(this);
			var lat = parseFloat($(this).attr("data-lat"));
			var lng = parseFloat($(this).attr("data-lng"));
			var label = $(this).attr("data-label");
			var html =
				"<div class='grid infoW'><div class='grid__item one-whole'><h3 class='text-red'>" +
				label +
				"</h3></div><div class='grid__item medium-up--one-half'><h4>Teléfono</h4><p>Tel:<a href ='tel:" +
				$(this).attr("data-tel") +
				"'>" +
				$(this).attr("data-tel") +
				"</a></p></div><div class='grid__item medium-up--one-half'><h4>Dirección</h4><p>" +
				$(this).attr("data-address") +
				"</p></div></div>";
			if (lat && lng) {
				branches.push([label, lat, lng, html]);
			}
		});
		fnMap.start(branches);
	},

	init: function (img, img_logo) {
		this._constructor();
		image = img;
		logo = img_logo;
		map = Leaflet.map("map-canvas");
		var branches = new Array();
		$(document).on("load", fnMap.pushBranches(branches));
	},
};

// Function to filter locations
// Plugin: List.js
fnSearch = {
	_constructor: function () {
		$input = $(".search.form-control");
		$state = $(".state.form-control");
		var locationsList;
	},

	_searchState: function (val, fields = ["address", "name", "schedule"]) {
		if (val) {
			locationsList.search(val, fields);
		} else {
			locationsList.search("");
		}
	},

	_restartMarkers: function () {
		array = new Array();
		fnMap.pushBranches(array);
	},

	init: function () {
		this._constructor();
		var options = {
			valueNames: ["name", "tel", "schedule", "address"],
		};

		locationsList = new List("locations-list", options);

		$input.on("keyup", function () {
			fnSearch._searchState($(this).val());
		});

		$state.on("change", function () {
			fnSearch._searchState($(this).val(), ["address"]);
		});

		locationsList.on("searchComplete", function () {
			fnSearch._restartMarkers();
		});
	},
};

fnFaqTabs = {
	__constructor: function () {
		this.$headers = $(".tab-header");
	},

	_setActive: function (target) {
		this.$headers.removeClass("active");
		this.$headers
			.filter('[data-tab-target="' + target + '"]')
			.addClass("active");
	},

	_toggleTab: function (el) {
		$tabs = $(".tab-body");
		$el = $(el);

		if ($el.length > 0) {
			if (!$el.hasClass("active")) {
				$tabs.filter(".active").slideUp(function () {
					$(this).removeClass("active");
				});
				$el.slideDown(function () {
					$(this).addClass("active");
				});
			}
		}
	},

	init: function () {
		this.__constructor();
		var self = this;
		//--

		self._toggleTab(
			this.$headers.filter(".active:first").attr("data-tab-target")
		);

		this.$headers.on("click", function () {
			self._setActive($(this).attr("data-tab-target"));
			self._toggleTab($(this).attr("data-tab-target"));
		});
	},
};

fnFaqCollapses = {
	__constructor: function () {
		this.$collapses = $(".simple-collapse");
	},

	_toggleCollapse: function ($el) {
		if ($el.hasClass("active")) {
			$el.removeClass("active");
			$el.next().removeClass("active");
		} else {
			$el.addClass("active");
			$el.next().addClass("active");
		}
	},

	init: function () {
		this.__constructor();
		var self = this;
		//--

		this.$collapses.on("click", function () {
			self._toggleCollapse($(this));
		});
	},
};
