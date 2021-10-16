<template>
  <div class="container">
    <div class="page-styles">
      <div class="row">
        <div class="col-9 compliance-content">
          <!-- <template v-for="content in compliance">
            <div :key="content.key" :class="{'intro': content.section === 'Intro'}">
              <h2 v-if="content.displayHeader">{{content.section}}</h2>
              <template v-if="content.content">
                <p v-for="(paragraph, index) in content.content" :key="index">{{paragraph}}</p>
              </template>

              <template v-if="content.subsections">
                <template v-for="section in content.subsections">
                  <div class="subsection" :key="section.key">
                    <h3 v-if="section.displayHeader">{{section.section}}</h3>
                    <p v-for="(paragraph, index) in section.content" :key="index">{{paragraph}}</p>
                  </div>
                </template>
              </template>

            </div>
          </template>
          <hr /> -->
          <template v-for="section in new_compliance.section">
            <div :key="section.id" :class="{'intro': section.sectionHeader === 'Intro'}">
              <h2 id="section.sectionHeader" v-if="section.displaySectionTitle">{{section.sectionHeader}}</h2>
              <template v-if="section.content">
                <span v-html="section.content"></span>
              </template>

              <template v-if="section.subsections">
                <template v-for="section in section.subsections">
                  <div class="subsection" :key="section.id">
                    <h3 :id="section.value.header.replace(' ', '')" v-if="section.value.displayHeader">
                      <a v-if="section.value.isHeaderLink===true" :href="section.value.headerLink" target="_blank">
                        {{section.value.header}}
                      </a>
                      <template v-else>
                        {{section.value.header}}
                      </template>
                    </h3>
                    <p v-if="section.type === 'about_paragraph'" id="section.value.header" v-html="section.value.content"></p>
                    <table id="table_block" v-else-if="section.type === 'table_block' ">
                      <thead v-if="section.value.content.first_row_is_table_header">
                        <!-- <td v-for="(column, i) in section.value.content.data.shift()" :key="i">{{column}}</td> -->
                        <td>{{ section.value.content.data[0] }}</td>
                      </thead>
                      <tr v-for="(row, index) in section.value.content.data" :key="index">
                        <td v-for="(column, i) in row" :key="i">{{column}}</td>
                      </tr>
                    </table>
                  </div>
                </template>
              </template>

            </div>
          </template>
        </div>
        <!-- TODO: Make this read the headers and make the headers anchors -->
        <nav class="col-3 table-of-contents jump-links">
          <ul>
            <li v-for="(section, index) in new_compliance.section" :key="index">{{section.sectionHeader}}
              <template  v-if="section.subsections">
                <ul>
                  <template v-for="(subsection, index) in section.subsections">
                    <li v-if="subsection.value.displayHeader" :key="index">
                      <a :href="'#' + subsection.value.header.replace(' ', '')">{{subsection.value.header}}</a>
                    </li>
                  </template>
                </ul>
              </template>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import pages from '@/api/pages'

export default {
  name: 'compliance',
  data () {
    return {
      compliance: [
        // {
        //   key: 1,
        //   displayHeader: false,
        //   section: 'Intro',
        //   content: [
        //     'As a part of the National Christian Homeschool Championship the MHAC abides by all the guidelines and requirements of the NCHC. In addition to their guidelines and procures the MHAC has other additional rules to follow.  Outlined below at the official rules, guidelines, and eligibility guidelines to be a part of the MHAC.'
        //   ]
        // },
        // {
        //   key: 2,
        //   displayHeader: true,
        //   section: 'Eligibility',
        //   subsections: [
        //     {
        //       key: 1,
        //       displayHeader: false,
        //       section: 'Intro',
        //       content: [
        //         'NCHC Events are for HomeSchool Student-Athletes, unless otherwise noted.',

        //         'All teams attending NCHC run or NCHC sanctioned events must have all their parents complete the NCHC Player registration form, additionally all coaches (head/assistant) must complete the NCHC coaches registration. This requirement has been put in place in order to assure that all parents, coaches, & leaders within the program fully understand and acknowledge NCHC eligibility guidelines that are designed to protect the reputation of HomeSchool Athletics & your teams post season experience.',

        //         'The National Christian HomeSchool Championship (NCHC) Events are designed to provide top-quality tournaments for HomeSchool Student-Athletes. There are a series of eligibility rules that are designed to ensure that every participant is a HomeSchool Student first and an athlete second. As HomeSchool sports continue to grow, it is the NCHC’s desire to make sure that the teams that participate in the HomeSchool division of the NCHC tournaments do not have a resemblance of AAU/Club teams &/or all-star teams. These rules are not only meant to keep the playing field level at the National Tournaments but are also designed to protect the reputation of HomeSchool teams on a national and local level.',

        //         'Note: The following rules apply to the National Championships and NCHC-sanctioned Regional Tournaments.'
        //       ]
        //     },
        //     {
        //       key: 2,
        //       displayHeader: true,
        //       section: 'Definition of A Homeschool Student-Athlete',
        //       content: [
        //         '"Homeschooling" is defined to mean that a student’s education is parent-directed.',

        //         'As such, the parents shall be involved in their child’s education by assuming the role of principal or headmaster, thereby (1) setting the date and requirements for high school graduation; (2) selecting and approving course materials and study schedules; and (3) selecting tutors, correspondence courses, videos, computer courses, and similar resources for their child’s education. HomeSchooling would also include a the person of legal responsibility* of the student filling the role of a parent (if pre-approved by the NCHC)',

        //         'If a player does not meet all the requirements below they may fill out a Hardships Exemption Form to request a exemption.'
        //       ]
        //     }
        //   ]
        // }
      ],
      new_compliance: [],
      anchorTags: []
    }
  },
  created () {
    this.initCompliance()
  },
  methods: {
    initCompliance () {
      pages.get('compliance')
        .then(response => {
          this.new_compliance = response
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../../assets/less/utils/variables.less';
.page-styles{
  min-height: 100vh;
  background-color: #fff;
  padding: 2rem 1rem;
  // margin-right: 1rem;
  // margin-left: 1rem;
}

.intro {
  padding-bottom: 2rem;
}
h2{
  margin-left: 2rem;
  position: relative;
  font-size: 1.6rem;
  font-family: @lato;

  &:after {
    content: '';
    display: block;
    height: 40px;
    width: 100%;
    // width: calc(100% + 2.4rem);
    border-top: 1.5px solid #2784C3;
    border-right: 2px solid #2784C3;
    border-left: 2px solid transparent;
    position: absolute;
    transform: skewX(-45deg) rotate(-180deg);
    left: -1rem;
    top: -1rem;
    margin-top: .6rem;
  }
}

h3{
  position: relative;
  font-size: 1.3rem;
  padding-bottom: 1rem;
  font-weight: 400;
  font-family: @lato;

  &:after {
    content: '';
    display: block;
    height: 40px;
    width: 100%;
    // width: calc(100% + 2.4rem);
    border-top: 1.5px solid #2784C3;
    border-right: 2px solid transparent;
    border-left: 2px solid #2784C3;
    position: absolute;
    transform: skewX(-45deg);
    left: -2rem;
    top: 1.5rem;
    margin-top: .6rem;
  }
}

.subsection {
  margin: 1rem 0 3rem 2rem;
  ul {
    padding-left: 3rem;
    li {
      list-style: disc;
    }
  }
}


.table-of-contents {
  position: sticky;
  top: 9rem;
  height: 100%;
  display: flex;
  &:before {
      content: '';
      // position: absolute;
      width: 1px;
      height: 51vh;
      display: flex;
      align-items: flex-start;
      background: #2784C3;
  }
  ul {
    padding-left: 1rem;
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  // border-spacing: 0 5px;
  position: relative;
  z-index: 1;

  th, tr {
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

      &.split-fields{
        td {
          border-right: 5px solid #CFCDCD;
          input {
            height: 50px;
            border: 0;
            outline: none;
          }
          &:last-child{
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
    &:last-child{
      border-right: 0px;
      // background-color: #CFCDCD;
    }
  }
}

</style>
