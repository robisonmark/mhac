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
            <slot name="tbody">
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
                                v-model="value[field.field_name]">
                            </selectbox>

                            <div v-else-if="field.type === 'customSelect'" tabindex="0"
                                @click="changeDisplay(field.field_name)" @keyup.space="changeDisplay(field.field_name)"
                                :class="{ 'vs': value[field.field_name] }" class="currentCustom">
                                {{ value[field.field_name] ? 'vs' : '@' }}
                            </div>

                            <multiselect v-else-if="field.type === 'multiselect' && field.field_name === 'season_roster'"
                                v-model="value[field.model]" label="level_name" track-by="team_id"
                                :options="selectOptions(field.field_name)" :closeOnSelect=false :multiple="true"
                                :taggable="true" @tag="addTag"></multiselect>

                            <multiselect v-else-if="field.type === 'multiselect' && field.field_name === 'level'"
                                v-model="value[field.model]" label="level_name" :options="selectOptions(field.field_name)"
                                track-by="id" :closeOnSelect="false" :multiple="true" :taggable="true" @tag="addTag">
                            </multiselect>

                            <input v-else :type="field.type" v-model="value[field.field_name]" />

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
    value: Array
})


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
            return $store.state.seasons;
        case 'opponent':
            return $store.state.teams.filter(team => team.team_id !== $store.getters.user.team_id);
        case 'season_roster':
            return $store.getters.teamLevels;
        case 'levels':
            return tabledata;
        case 'team_name':
            return $store.state.teams;
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
    $root.$emit('changeEdit');
}

function age(Birthday) {
    Birthday = new Date(Birthday + 'T00:00:00');
    var ageDifMs = Date.now() - Birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function savedata() {
    $root.$emit('save');
}

function deletedata() {
    // Implement logic for deleting data
}
</script>