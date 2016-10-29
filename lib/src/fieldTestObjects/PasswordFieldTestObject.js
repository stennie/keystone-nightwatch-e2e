var utils = require('../utils');

module.exports = function PasswordFieldTestObject (config) {
	var selectElem = function (elem) {
		return config.formSelector + ' ' + self.selector + ' ' + self.elements[elem];
	};
	var selectListScreenElem = function (elem) {
		return config.formSelector + ' ' + self.listScreenElements[elem];
	};
	var self = {
		selector: '.field-type-password[for="' + config.fieldName + '"]',
		elements: {
			label: '.FormLabel',
			value: 'input[name="' + config.fieldName + '"]',
			confirmValue: 'input[name="' + config.fieldName + '_confirm"]',
			setPasswordButton: '.Button',
		},
		listScreenElements: {
			ui: 'a.ItemList__value',
			value: 'a.ItemList__value',
			link: 'a',
		},
		commands: {
			clickFieldUI: function (browser, elem) {
				browser.click(selectElem(elem));
				return browser;
			},
			assertFieldUIVisible: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.be.visible;
				browser
					.expect.element(selectElem('label')).text.to.equal(utils.titlecase(config.fieldName));
				if (options.passwordShown) {
					browser
						.expect.element(selectElem('value')).to.be.visible;
				} else {
					browser
						.expect.element(selectElem('setPasswordButton')).to.be.visible;
				}
				return browser;
			},
			assertFieldUINotVisible: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.not.be.visible;
				browser
					.expect.element(selectElem('label')).text.to.equal(utils.titlecase(config.fieldName));
				if (options.passwordShown) {
					browser
						.expect.element(selectElem('value')).to.not.be.visible;
				} else {
					browser
						.expect.element(selectElem('setPasswordButton')).to.not.be.visible;
				}
				return browser;
			},
			assertFieldDOMPresent: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.be.present;
				if (options.passwordShown) {
					browser
						.expect.element(selectElem('value')).to.be.present;
				} else {
					browser
						.expect.element(selectElem('setPasswordButton')).to.be.present;
				}
				return browser;
			},
			assertFieldDOMNotPresent: function (browser, options) {
				browser
					.expect.element(selectElem('label')).to.not.be.present;
				if (options.passwordShown) {
					browser
						.expect.element(selectElem('value')).to.not.be.present;
				} else {
					browser
						.expect.element(selectElem('setPasswordButton')).to.not.be.present;
				}
				return browser;
			},
			fillFieldInputs: function (browser, input, options) {
				browser
					.clearValue(selectElem('value'))
					.setValue(selectElem('value'), input.value)
					.clearValue(selectElem('confirmValue'))
					.setValue(selectElem('confirmValue'), input.confirm);
				return browser;
			},
			assertFieldInputs: function (browser, input, options) {
				browser
					.waitForElementVisible(selectElem('value'));
				browser
					.getValue(selectElem('value'), function (result) {
						browser.api.assert.equal(result.state, 'success');
						browser.api.assert.equal(result.value, input.value);
					});
				return browser;
			},
			assertListScreenFieldUIVisible: function (browser, options) {
				browser
					.expect.element(selectListScreenElem('ui')).to.be.visible;
				return browser;
			},
			assertListScreenFieldUINotVisible: function (browser, options) {
				browser
					.expect.element(selectListScreenElem('ui')).to.not.be.visible;
				return browser;
			},
			assertListScreenFieldUIPresent: function (browser, options) {
				browser
					.expect.element(selectListScreenElem('ui')).to.be.present;
				return browser;
			},
			assertListScreenFieldUINotPresent: function (browser, options) {
				browser
					.expect.element(selectListScreenElem('ui')).to.not.be.present;
				return browser;
			},
			assertListScreenFieldValueEquals: function (browser, value, options) {
				browser
					.expect.element(selectListScreenElem('value')).text.to.equal(value);
				return browser;
			},
			assertListScreenFieldValueContains: function (browser, value, options) {
				browser
					.expect.element(selectListScreenElem('value')).text.to.contain(value);
				return browser;
			},
			clickListScreenFieldValue: function (browser, options) {
				browser
					.click(selectListScreenElem('link'));
				return browser;
			},
		},
	};

	return self;
};