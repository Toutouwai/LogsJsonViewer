$(document).ready(function() {

	// Data from module config
	const labels = ProcessWire.config.LogsJsonViewer.labels;
	const jv_options = ProcessWire.config.LogsJsonViewer.jv_options;

	// Init json-viewer
	function initJsonViewer() {
		let max_json_cols = 0;
		$('#ProcessLogPage tr').each(function(i, el) {
			let json_cols = 0;
			$(this).find('td').each(function(i, el) {
				const str = $(this).html();
				if(isJson(str)) {
					json_cols++;
					const json_viewer = document.createElement("andypf-json-viewer");
					for(const prop in jv_options) {
						json_viewer[prop] = jv_options[prop];
					}
					json_viewer.data = str;
					$(this).addClass('ljv-cell');
					$(this).wrapInner('<div class="ljv-raw"></div>');
					$(this).append(json_viewer);
					$(this).append(`<button type="button" class="ljv-toggle-raw"><i class="fa fa-toggle-on"></i> ${labels.toggle_raw}</button>`);
				}
				if(json_cols > max_json_cols) max_json_cols = json_cols;
			});
		});
		// Divide JSON column width by the max number of JSON columns per row and apply
		if(max_json_cols) {
			const cell_width = ProcessWire.config.LogsJsonViewer.col_width / max_json_cols;
			$('.ljv-cell').css('width', cell_width + '%');
		}
	}

	// Is the given string JSON?
	function isJson(str) {
		const first_char = str.charAt(0);
		const last_char = str.charAt(str.length - 1);
		if(first_char === '{' && last_char === '}' || first_char === '[' && last_char === ']') {
			try {
				JSON.parse(str);
				return true;
			} catch(e) {
				return false;
			}
		} else {
			return false;
		}
	}

	// Init json-viewer on DOM ready
	initJsonViewer();

	// Init json-viewer on AJAX complete (pagination change)
	$(document).on('ajaxComplete', initJsonViewer);

	// Toggle between formatted and raw data
	$(document).on('click', '.ljv-toggle-raw', function(e) {
		const $icon = $(this).find('i');
		const $raw = $(this).siblings('.ljv-raw');
		if($raw.is(':visible')) {
			$icon.removeClass('fa-toggle-off').addClass('fa-toggle-on');
		} else {
			$icon.removeClass('fa-toggle-on').addClass('fa-toggle-off');
		}
		$(this).siblings('andypf-json-viewer').toggle();
		$(this).siblings('.ljv-raw').toggle();
	});

});
