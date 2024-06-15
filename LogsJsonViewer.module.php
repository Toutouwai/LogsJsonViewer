<?php namespace ProcessWire;

class LogsJsonViewer extends WireData implements Module, ConfigurableModule {

	/**
	 * Construct
	 */
	public function __construct() {
		parent::__construct();
		$this->jsonViewerOptions = <<<EOT
expanded: true
indent: 2
showDataTypes: false
theme: monokai
showToolbar: true
showSize: true
showCopy: true
expandIconType: square
EOT;
		$this->jsonColumnWidth = 60;
	}

	/**
	 * Ready
	 */
	public function ready() {
		$this->addHookBefore('ProcessLogger::executeView', $this, 'beforeLoggerExecute');
	}

	/**
	 * Before ProcessLogger::execute
	 *
	 * @param HookEvent $event
	 */
	protected function beforeLoggerExecute(HookEvent $event) {
		$config = $this->wire()->config;

		// Add assets
		$info = $this->wire()->modules->getModuleInfo($this);
		$version = $info['version'];
		$config->styles->add($config->urls->$this . "$this.css?v=$version");
		$config->scripts->add($config->urls->$this . "/json-viewer/json-viewer.js?v=$version");
		$config->scripts->add($config->urls->$this . "$this.js?v=$version");

		// Module config to JS
		$data = [
			'labels' => [
				'toggle_raw' => $this->_('Toggle formatting'),
			],
			'jv_options' => [],
			'col_width' => $this->jsonColumnWidth,
		];
		$jv_options_string = $this->jsonViewerOptions;
		$lines = explode("\n", str_replace("\r", "", $jv_options_string));
		foreach($lines as $line) {
			$line = trim($line);
			if(!$line) continue;
			list($key, $value) = explode(':', $line, 2);
			$data['jv_options'][$key] = trim($value);
		}
		$config->js($this->className, $data);
	}

	/**
	 * Config inputfields
	 *
	 * @param InputfieldWrapper $inputfields
	 */
	public function getModuleConfigInputfields($inputfields) {
		$modules = $this->wire()->modules;

		$f = $modules->get('InputfieldTextarea');
		$f_name = 'jsonViewerOptions';
		$f->name = $f_name;
		$f->label = $this->_('Options for json-viewer');
		$f->description = $this->_('These options are passed to the [json-viewer](https://github.com/andypf/json-viewer/) JavaScript library.');
		$f->value = $this->$f_name;
		$inputfields->add($f);

		$f = $modules->get('InputfieldInteger');
		$f_name = 'jsonColumnWidth';
		$f->name = $f_name;
		$f->label = $this->_('Width of JSON column');
		$f->description = $this->_('The percentage width of the JSON column in the ProcessLogger table.');
		$f->inputType = 'number';
		$f->min = 0;
		$f->max = 100;
		$f->value = $this->$f_name;
		$inputfields->add($f);
	}

}
