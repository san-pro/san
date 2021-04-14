define(function (require) {
    var san = require('san');

    return san.defineComponent({
        template: `
            <div>
                <span>count: {{ count }} </span>
                <input type="text" value="{= count =}"/>
                <div>double: {{ double }} </div>
                <div>triple: {{ triple }} </div>
                <button on-click="increment"> +1 </button>
                <button on-click="decrement"> -1 </button>
            </div>
        `,

        setup(ctx) {
            // const {reactive, watch, computed} = ctx;
            const {reactive, watch, computed, onAttached, onCreated} = ctx;
            const data = reactive({
                count: 1,
                triple: 3
            });
            const increment = () => {
                let count = data.get('count');
                data.set('count', ++count);
                data.set('triple', count * 3);
            };

            const decrement = () => {
                let count = data.get('count');
                data.set('count', --count);
                data.set('triple', count * 3);
            };

            watch('count', newVal => {
                console.log('count:', newVal);
            });

            computed({
                double() {
                    return data.get('count') * 2;
                    // return this.data.get('count') * 2;
                }
            });

            onAttached(() => {
                console.log('onAttached');
            });

            onCreated(() => {
                console.log('onCreated');
            });

            return {
                increment,
                decrement
            }
        },

        // setup: function() {
        //     // let count = 0;
        //     const count = san.reactive(0);
        //     const increment = function() {
        //         // count.set(count.get())
        //         let count = this.data.get('count');
        //         this.data.set('count', ++count);
        //     };

        //     return {
        //         increment,
        //         count
        //     }
        // },

        // setup: function() {
        //     const count = san.reactive(0);
        //     const increment = () => {
        //         count.set(++count);
        //     };
        //     const decrement = () => {
        //         count.set(--count);
        //     };

        //     return {
        //         increment,
        //         decrement,
        //         count
        //     }
        // },
        // setup: function() {
        //     const count = san.reactive(0);
        //     return {
        //         log: function() {
        //             console.log('count:', this.data.get('count'));
        //         },
        //         data: {
        //             count: count
        //         }
        //     }
        // },

        // initData: function () {
        //     return {
        //         count: 0
        //     }
        // },

    });
});
