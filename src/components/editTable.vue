<template>
    <table id="table" name="edittable">
        <thead id="table-head-fixed">
            <slot name="thead">
                <tr>
                    <template v-for="(column, key, index) in columns">
                        <th v-if="!column.field_name.includes('id')" :key="index" :class="column.name.toLowerCase()">{{
                            column.name }}
                        </th>
                    </template>
                    <th></th>
                </tr>
            </slot>
        </thead>

        <tbody id="table-body" name="tbody">
            <slot name="body">
                <tr v-for="(data, index) in tabledata" :key="index">
                    <template v-for="(column, idx) in columns">
                        <td :key="idx" v-if="!column.field_name.includes('id')" :class="idx">
                            <template v-if="column.field_name.includes('date')">
                                {{ formatDates(data[column.field_name], false) }}
                            </template>
                            <template v-else-if="column.field_name === 'season_roster'">
                                <template v-for="(c) in  data[column.field_name]">
                                    {{ c.level_name }}
                                </template>
                            </template>
                            <template v-else-if="column.field_name === 'level'">
                                {{ data[column.field_name].level_name }}
                            </template>
                            <template v-else-if="column.field_name === 'opponent'">
                                {{ data[column.field_name].team_name }}
                            </template>
                            <template v-else-if="column.field_name === 'host'">
                                <div tabindex="0" :class="{ 'vs': data[column.field_name] }" class="currentCustom">{{
                                    data[column.field_name]
                                    ? 'vs' : '@' }}</div>
                            </template>
                            <template v-else-if="column.field_name === 'feet' || column.field_name === 'inches'">
                                {{ data['height'][column.field_name] }}
                            </template>
                            <template v-else-if="column.field_name === 'archive'">
                                <input type='checkbox' v-model="data[column.field_name]" id="index" disabled>
                            </template>
                            <template v-else-if="column.field_name === 'team_name' && 'season_teams' in data">
                                <template v-for="(c) in data['season_teams']">
                                    {{ c.team_name }}
                                </template>
                            </template>
                            <template v-else>
                                {{ data[column.field_name] }}
                            </template>
                        </td>
                    </template>
                </tr>

                <tr v-if="!addNew" @click="addTo">
                    <td :colspan="colspan" align="center" class="add-button">
                        <template v-if="$route.name === 'roster'">Edit Roster</template>
                        <template v-else-if="$route.name === 'schedule'">Add New Game to Schedule</template>
                    </td>

                </tr>

                <tr class="split-fields" v-else>

                    <template v-for="(field, index) in columns" key="index">
                        <td v-if="!field.field_name.includes('id') && !field.field_name.includes('actions')"
                            class="input-con">
                            <selectbox v-if="field.type === 'select'" :id="'field.field_name'"
                                :options="selectOptions(field.field_name)" :trackby="field.track_by" placeholder="test"
                                v-model="modelValue[field.field_name]">
                            </selectbox>

                            <div v-else-if="field.type === 'customSelect'" tabindex="0"
                                @click="changeDisplay(field.field_name)" @keyup.space="changeDisplay(field.field_name)"
                                :class="{ 'vs': modelValue[field.field_name] }" class="currentCustom">
                                {{ modelValue[field.field_name] ? 'vs' : '@' }}
                            </div>

                            <multiselect v-else-if="field.type === 'multiselect' && field.field_name === 'season_roster'"
                                v-model="modelValue[field.model]" label="level_name" rack-by="team_id"
                                :options="selectOptions(field.field_name)" :closeOnSelect=false :multiple="true"
                                :taggable="true" @tag="addTag"></multiselect>

                            <multiselect v-else-if="field.type === 'multiselect' && field.field_name === 'level'"
                                v-model="modelValue[field.model]" label="level_name"
                                :options="selectOptions(field.field_name.toLowerCase())" track-by="id"
                                :closeOnSelect="false" :multiple="true" :taggable="true" @tag="addTag">
                            </multiselect>

                            <input v-else :type="field.type" v-model="modelValue[field.field_name]" />

                        </td>
                        <td v-else-if="field.field_name === 'actions'" align="right" width="1%">
                            <font-awesome-icon :icon="['fas', 'save']" class="icon" @click="savedata"></font-awesome-icon>
                        </td>
                    </template>
                </tr>
            </slot>
        </tbody>

        <slot name="tfoot">
        </slot>
    </table>
</template>

<script setup>
import { ref, watch } from 'vue';
import Multiselect from 'vue-multiselect';
import Selectbox from './selectbox.vue';
import { useRootMixin } from '@/mixins/root.js';

import { useStore } from 'vuex';

const store = useStore();

const currentSort = ref('');
const currentSortDir = ref('asc');
const addNew = ref(false);
const switchPosition = ref(false);
const switchDisplay = ref('@');
const { formatDates } = useRootMixin();

const props = defineProps({
    edit: Boolean,
    columns: Array,
    config: Object,
    tabledata: Array,
    modelValue: Object
})

const emit = defineEmits(['saved', 'changeEdit'])


watch(() => props.edit, (newVal) => {
    addNew.value = newVal;
});

const colspan = ref(props.columns.length);

function getNamesFromSeasonRoster(teamList) {
    const listNames = [];
    for (let i = 0; i < teamList.length; i++) {
        listNames.push(teamList[i]);
    }
    return listNames;
}

function selectOptions(name) {
    switch (name) {
        case 'division':
            return store.state.seasons;
        case 'opponent':
            return store.state.teams.filter(team => team.team_id !== store.getters.user.team_id);
        case 'season_roster':
            return store.getters.teamLevels;
        case 'level':
            return this.props.tabledata;
        case 'team_name':
            return store.state.teams;
    }
}

function addTag(newTag) {
    const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
    };
    options.push(tag);
    value.push(tag);
}

function trackBy(name) {
    switch (name) {
        case 'division':
            return 'level';
        case 'opponent':
            return 'team_name';
    }
}

function setFixedTableHead() {
    const columnCount = 6;
    const tableWidth = document.getElementById('table-body').rows[0].clientWidth;

    document.getElementById('table-head-fixed').style.width = tableWidth + 'px';
    document.getElementById('table-head-fixed').style.position = 'fixed';

    for (let i = 0; i <= columnCount; ++i) {
        const columnWidth = document.getElementById('table-body').rows[0].cells[i].offsetWidth;
        document.getElementById('table-head-fixed').rows[0].cells[i].width = columnWidth + 'px';
    }
}

function setScrollPos() {
    const scrollPos = document.getElementById('table').getBoundingClientRect().left;
    document.getElementById('table-head-fixed').style.left = scrollPos + 'px';
}

function setTableTopPos() {
    const tableYPos = document.getElementById('table').getBoundingClientRect().top;
    document.getElementById('table-head-fixed').style.top = tableYPos + 'px';
    document.getElementById('table').style.marginTop = tableYPos + 'px';
}

function sortTable(s, nested) {
    if (s === currentSort.value) {
        currentSortDir.value = currentSortDir.value === 'asc' ? 'desc' : 'asc';
    }
    currentSort.value = s;

    tabledata.sort((a, b) => {
        let modifier = 1;
        if (nested) {
            if (currentSortDir.value === 'desc') modifier = -1;
            if (a[currentSort.value][nested] !== '') {
                if (a[currentSort.value][nested] < b[currentSort.value][nested]) return -1 * modifier;
                if (a[currentSort.value][nested] > b[currentSort.value][nested]) return 1 * modifier;
            }
            return 0;
        } else {
            if (currentSortDir.value === 'desc') modifier = -1;
            if (a[currentSort.value] < b[currentSort.value]) return -1 * modifier;
            if (a[currentSort.value] > b[currentSort.value]) return 1 * modifier;
            return 0;
        }
    });
}

function changeDisplay(field) {
    switchPosition.value = !switchPosition.value;

    if (props.config.page === 'schedule') {
        value[field] = !value[field];
    }
}

function addTo() {
    addNew.value = true;
    emit('changeEdit');
}

function age(Birthday) {
    Birthday = new Date(Birthday + 'T00:00:00');
    var ageDifMs = Date.now() - Birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function savedata() {
    emit('save');
}

function deletedata() {
    // Implement logic for deleting data
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
table {
    width: 100%;
    border-collapse: collapse;
    // border-spacing: 0 5px;
    position: relative;
    z-index: 1;

    th,
    tr {
        text-align: left;

        .number {
            text-align: center;
        }
    }

    thead {
        tr {
            height: 40px;
        }

        th {
            // font-family: @lato;
            font-weight: 200;
            font-size: .8rem;
            cursor: pointer;

            .icon {
                display: none;
            }

            &.sort {
                font-weight: 600;
                color: #021A2B;

                .icon {
                    display: inline-block;
                }

                .asc {
                    transform: rotate(180deg);
                    transition: ease-in-out .3s all;
                }

                .dsc {
                    // transform: rotate(180deg);
                    transition: ease-in-out .3s all;
                }
            }
        }
    }

    tbody {
        tr {
            background-color: #fff;
            height: 50px;
            border-bottom: 5px solid #CFCDCD;

            .add-button {
                cursor: pointer;
            }

            &.split-fields {
                td {
                    border-right: 5px solid #CFCDCD;

                    input {
                        height: 50px;
                        border: 0;
                        outline: none;
                    }

                    &:last-child {
                        border-right: 0px;
                        // background-color: #CFCDCD;
                    }
                }
            }

            // tr last child
            &:last-child {
                border-bottom: 0px;
                // background-color: #CFCDCD;
            }
        }
    }

    td {
        padding-left: 1rem;
        padding-right: 1rem;
        position: relative;

        &.input-con {
            padding: 0;
        }

        &:last-child {
            border-right: 0px;
            // background-color: #CFCDCD;
        }
    }
}

select {
    border: 0;
    outline: none;
}

.currentCustom {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 1.3rem;

    &.vs {
        font-style: italic;
        color: #fff;
        font-size: 1rem;
        z-index: 1;
        position: relative;

        &:after {
            content: '';
            height: 1.7rem;
            width: 1.7rem;
            position: absolute;
            border-radius: 50%;
            background: var(--bg-color);
            z-index: -1;
        }
    }

}

.icons {
    position: absolute;
    right: -3rem;
}

.multiselect__input {
    border: 0 !important;
}
</style>
