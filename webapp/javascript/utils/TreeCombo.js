Ext.ns("Ext.ux");

/*
 * Animal's TreeCombo modified by Wedgie to handle a maxHeight config setting.
 * This updated version fixes the following problems:
 *   1) Accounts for horizontal scrollbar when calculating required height
 *   2) Set height using correct method to fire resize and update the shadow
 *   3) Realigns the tree with the trigger field when the tree size changes
 */

Ext.ux.TreeCombo = Ext.extend(Ext.form.TriggerField, {
    initComponent : function(){
        this.readOnly = true;
        Ext.ux.TreeCombo.superclass.initComponent.call(this);
        this.on('specialkey', function(f, e){
            if(e.getKey() == e.ENTER){
                this.onTriggerClick();
            }
        }, this);
        this.on('focus', function(){
        	this.onTriggerClick();
        },this);
        this.on('render',function() {
            this.getTree();
            this.treePanel.getEl().alignTo(this.wrap, 'tl-bl?');
        });
    },

    onTriggerClick: function() {
    	this.getTree().getEl().alignTo(this.wrap, 'tl-bl?');
        this.getTree().show();
//        if(this.value) {
//        	this.getTree().loader.load();
//            var node = this.treePanel.getNodeById(this.value);
//            var path = node.getPath();
//            this.treePanel.expandPath(path);
//            this.treePanel.selectPath(path);
//        } 
    },
    getTree: function() {
        if (!this.treePanel) {
            if (!this.treeWidth) {
                this.treeWidth = Math.max(200, this.width || 200);
            }
            if (!this.treeHeight) {
                this.treeHeight = 200;
            }
            this.treePanel = new Ext.tree.TreePanel({
                renderTo: Ext.getBody(),
                loader: this.loader || new Ext.tree.TreeLoader({
                    preloadChildren: (typeof this.root == 'undefined'),
                    url: this.dataUrl || this.url
                }),
                root: this.root || new Ext.tree.AsyncTreeNode({children: this.children}),
                rootVisible: (typeof this.rootVisible != 'undefined') ? this.rootVisible : (this.root ? true : false),
                floating: true,
                autoScroll: true,
                minWidth: 200,
                minHeight: 200,
                width: this.treeWidth,
                height: this.treeHeight,
                listeners: {
                    hide: this.onTreeHide,
                    show: this.onTreeShow,
                    click: this.onTreeNodeClick,
                    expandnode: this.onExpandOrCollapseNode,
                    collapsenode: this.onExpandOrCollapseNode,
                    //resize: this.onTreeResize,
                    scope: this
                }
            });
            this.relayEvents(this.treePanel.loader, ['beforeload', 'load', 'loadexception']);
//            this.treePanel.show();
//            this.treePanel.hide();
//            
//            if(this.resizable){
//                this.resizer = new Ext.Resizable(this.treePanel.getEl(),  {
//                   pinned:true, handles:'se'
//                });
//                this.mon(this.resizer, 'resize', function(r, w, h){
//                    this.treePanel.setSize(w, h);
//                }, this);
//            }
        }
        return this.treePanel;
    },

    onExpandOrCollapseNode: function() {
        if (!this.maxHeight || this.resizable)
            return;  // -----------------------------> RETURN
        var treeEl = this.treePanel.getTreeEl();
        var heightPadding = treeEl.getHeight() - treeEl.dom.clientHeight;
        var ulEl = treeEl.child('ul');  // Get the underlying tree element
        var heightRequired = ulEl.getHeight() + heightPadding;
        if (heightRequired > this.maxHeight)
            heightRequired = this.maxHeight;
        this.treePanel.setHeight(heightRequired);
    },

//    onTreeResize: function() {
//        if (this.treePanel)
//            this.treePanel.getEl().alignTo(this.wrap, 'tl-bl?');
//    },

    onTreeShow: function() {
        Ext.getDoc().on('mousewheel', this.collapseIf, this);
        Ext.getDoc().on('mousedown', this.collapseIf, this);
    },

    onTreeHide: function() {
        Ext.getDoc().un('mousewheel', this.collapseIf, this);
        Ext.getDoc().un('mousedown', this.collapseIf, this);
    },

    collapseIf : function(e){
        if(!e.within(this.wrap) && !e.within(this.getTree().getEl())){
            this.collapse();
        }
    },

    collapse: function() {
        this.getTree().hide();
        if (this.resizer)
            this.resizer.resizeTo(this.treeWidth, this.treeHeight);
    },

    // private
    validateBlur : function(){
        return !this.treePanel || !this.treePanel.isVisible();
    },

    setValue: function(v) {
        this.startValue = this.value = v;
        if (this.treePanel) {
            var n = this.treePanel.getNodeById(v);
            if (n) {
                this.setRawValue(n.id);
            }
        }
    },

    getValue: function() {
        return this.value;
    },

    onTreeNodeClick: function(node, e) {
        this.setRawValue(node.text);
        this.value = node.id;
        this.fireEvent('select', this, node);
        this.collapse();
    }
});