$(document).ready(function() {

	// Data from module config
	const labels = ProcessWire.config.LogsJsonViewer.labels;
	const jv_options = ProcessWire.config.LogsJsonViewer.jv_options;

	// Init json-viewer
	function initJsonViewer() {
		$('#ProcessLogPage td').each(function(i, el) {
			const str = $(this).html();
			if(isJson(str)) {
				const json_viewer = document.createElement("andypf-json-viewer");
				for(const prop in jv_options) {
					json_viewer[prop] = jv_options[prop];
				}
				json_viewer.data = str;
				$(this).css('width', ProcessWire.config.LogsJsonViewer.col_width + '%');
				$(this).wrapInner('<div class="ljv-raw"></div>');
				$(this).append(json_viewer);
				$(this).append(`<button type="button" class="ljv-toggle-raw"><i class="fa fa-toggle-on"></i> ${labels.toggle_raw}</button>`);
			}
		});
	}

	// Is the given string JSON?
	function isJson(str) {
		if(!str.startsWith('{') || !str.endsWith('}')) return false;
		try {
			JSON.parse(str);
			return true;
		} catch(e) {
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
