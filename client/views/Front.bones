view = views.Main.extend({
    render: function() {
        $(this.el).empty().append(templates.Front(this));
        return this;
    }
});
