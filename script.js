define(["jquery"], function ($) {
  var CustomWidget = function () {
    var self = this,
      firstInput,
      secondInput,
      resultInput,
      firstValue = 0,
      secondValue = 0,
      result = 0;

    this.getFields = function () {
      var firstValParent = $(
        `.linked-form__field__label[title="${self.get_settings().summand1}"]`
      ).parent();
      if (firstValParent.hasClass("linked-form__field-numeric")) {
        const firstFieldId = firstValParent.data("id");
        firstInput = $(`input[name="CFV[${firstFieldId}]"][type="numeric"]`);
      }

      var secondValParent = $(
        `.linked-form__field__label[title="${self.get_settings().summand2}"]`
      ).parent();
      if (secondValParent.hasClass("linked-form__field-numeric")) {
        const secondFieldId = secondValParent.data("id");
        secondInput = $(`input[name="CFV[${secondFieldId}]"][type="numeric"]`);
      }

      var resultParent = $(
        `.linked-form__field__label[title="${self.get_settings().sum}"]`
      ).parent();
      if (resultParent.hasClass("linked-form__field-numeric")) {
        const resultId = resultParent.data("id");
        resultInput = $(`input[name="CFV[${resultId}]"][type="numeric"]`);
        resultInput.attr("disabled", true);
      }
    };

    this.getValues = function () {
      firstValue = firstInput?.val() || 0;
      secondValue = secondInput?.val() || 0;
    };

    this.sum = function () {
      result = Number(firstValue) + Number(secondValue);
    };

    this.outputResult = function () {
      resultInput?.val(result);
    };

    this.callbacks = {
      settings: function () {},
      dpSettings: function () {},
      init: function () {
        if (self.system().area == "lcard") {
          self.getFields();
        }
        return true;
      },
      bind_actions: function () {
        if (self.system().area == "lcard") {
          firstInput.on("input", () => {
            self.getValues();
            self.sum();
            self.outputResult();
          });

          secondInput.on("input", () => {
            self.getValues();
            self.sum();
            self.outputResult();
          });
        }
        return true;
      },
      render: function () {
        return true;
      },
      contacts: {},
      leads: {
        selected: function () {},
      },
      onSave: function () {
        return true;
      },
    };
    return this;
  };
  return CustomWidget;
});
