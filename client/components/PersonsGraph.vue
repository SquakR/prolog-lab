<template>
  <div class="persons-graph">
    <div class="pa-2 control">
      <h3>Control</h3>
      <ol>
        <li>Double click an empty space to add a person.</li>
        <li>
          Click a parent node and then a child node to create a parent
          relationship.
        </li>
        <li>Double click a node or a an edge to delete a person.</li>
      </ol>
    </div>
    <div ref="graphContainerEl" class="graph-container">
      <div ref="graphEl" class="graph" />
      <AddNodeMenu
        ref="addNodeMenu"
        v-model="inputPerson"
        v-bind="addNodeMenuProps"
        @add-person="addPersonClick"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import cytoscape, { Core, EventObjectNode, EventObjectCore } from 'cytoscape'
import { Gender, InputPerson, OutputPerson } from '~/api'
import AddNodeMenu, { AddNodeMenuProps } from '~/components/AddNodeMenu.vue'

const props = defineProps<{
  persons: OutputPerson[]
}>()

const emit = defineEmits<{
  (e: 'add-person', inputPerson: InputPerson): void
  (e: 'delete-person', id: string): void
}>()

const graphContainerEl = ref<HTMLDivElement>(null)
const graphEl = ref<HTMLDivElement>(null)
const graph = ref<Core>(null)
const addNodeMenu = ref<InstanceType<typeof AddNodeMenu>>(null)

const addNodeMenuProps = ref<Omit<AddNodeMenuProps, 'modelValue'>>({
  visible: false,
  left: 0,
  top: 0
})

const inputPerson = ref<InputPerson>({
  name: '',
  gender: Gender.FEMALE,
  node: {
    x: 0,
    y: 0
  }
})

onMounted(() => {
  graph.value = cytoscape({
    container: graphEl.value,
    layout: { name: 'preset' },
    elements: props.persons.map((person) => ({
      group: 'nodes',
      style: {
        'background-color': person.gender === Gender.MALE ? 'blue' : 'red'
      },
      position: {
        ...person.node
      },
      data: person
    })),
    style: [
      {
        selector: 'node',
        style: {
          label: 'data(name)'
        }
      }
    ]
  })

  graph.value.on('dblclick', async (event: EventObjectCore) => {
    if (event.isDefaultPrevented()) {
      return
    }
    await nextTick()
    addNodeMenuProps.value.visible = true
    addNodeMenuProps.value.left = Number.MAX_VALUE
    addNodeMenuProps.value.top = Number.MAX_VALUE
    await nextTick()
    addNodeMenuProps.value.left = Math.min(
      graphContainerEl.value.offsetWidth - addNodeMenu.value.$el.offsetWidth,
      event.originalEvent.offsetX
    )
    addNodeMenuProps.value.top = Math.min(
      graphContainerEl.value.offsetHeight - addNodeMenu.value.$el.offsetHeight,
      event.originalEvent.offsetY
    )
    inputPerson.value.node = { ...event.position }
  })

  graph.value.on('click', () => {
    nextTick(() => {
      if (addNodeMenuProps.value.visible) {
        addNodeMenuProps.value.visible = false
      }
    })
  })

  graph.value.on('dragpan', () => {
    addNodeMenuProps.value.visible = false
  })

  graph.value.on('zoom', () => {
    addNodeMenuProps.value.visible = false
  })

  graph.value.on('dblclick', 'node', (event: EventObjectNode) => {
    const person: OutputPerson = event.target.data()
    emit('delete-person', person._id)
    event.preventDefault()
  })
})

const addPerson = (persons: OutputPerson[]) => {
  persons.forEach((person) => {
    graph.value.add({
      group: 'nodes',
      style: {
        'background-color': person.gender === Gender.MALE ? 'blue' : 'red'
      },
      position: {
        ...person.node
      },
      data: person
    })
  })
}

const deletePerson = (persons: OutputPerson[]) => {
  persons.forEach((person) => {
    graph.value.remove(`node[_id = "${person._id}"]`)
  })
}

const addPersonClick = () => {
  emit('add-person', inputPerson.value)
  addNodeMenuProps.value.visible = false
}

watch(
  () => props.persons,
  (newPersons, oldPersons) => {
    if (newPersons.length > oldPersons.length) {
      addPerson(
        newPersons.filter(
          (newPerson) =>
            !oldPersons.find((oldPerson) => newPerson._id === oldPerson._id)
        )
      )
    } else if (oldPersons.length > newPersons.length) {
      deletePerson(
        oldPersons.filter(
          (oldPerson) =>
            !newPersons.find((newPerson) => oldPerson._id === newPerson._id)
        )
      )
    }
  }
)
</script>

<style lang="sass">
.persons-graph
  height: 500px
  position: relative
  .graph-container
    position: relative
    overflow: hidden
    background: #f6f6f6
    width: 100%
    height: 100%
  .graph
    width: 100%
    height: 100%
  .control
    list-style-position: inside
</style>
