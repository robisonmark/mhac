<template>
    <div class="modal" v-show="showModal">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header"> 
                    {{ modalTitle }} 
                </div>
                <div class="modal-body">
                    Test
                </div>
                <button class="mt-3 border-b border-teal font-semibold" @click="close()">Close</button>
            </div>
        </div>
    </div>
</template>

  <script>
    export default {
        name: 'modal',
        props: [
            'showModal',
            'modalTitle',
            'value'
        ],
        methods: {
            close() {
                this.$root.$emit('toggleModal');
            }            
        }
    };
</script>

<style>
    .modal {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
    }

    .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    }

    .modal-container {
    width: 250px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h3 {
    margin-top: 0;
    color: #42b983;
    }

    .modal-body {
    margin: 20px 0;
    }

    .modal-default-button {
    display: block;
    margin-top: 1rem;
    }

    /*
    * The following styles are auto-applied to elements with
    * transition="modal" when their visibility is toggled
    * by Vue.js.
    *
    * You can easily play with the modal transition by editing
    * these styles.
    */

    .modal-enter {
    opacity: 0;
    }

    .modal-leave-active {
    opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
    }
</style>