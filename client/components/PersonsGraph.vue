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
import { Gender, Node, InputPerson, OutputPerson, Parent } from '~/api'
import { difference } from '~/utils'
import AddNodeMenu, { AddNodeMenuProps } from '~/components/AddNodeMenu.vue'

type Position = {
  x: number
  y: number
}

const props = defineProps<{
  persons: OutputPerson[]
  parents: Parent[]
}>()

const emit = defineEmits<{
  (e: 'add-person', inputPerson: InputPerson): void
  (e: 'move-person', personId: string, node: Node): void
  (e: 'delete-person', personId: string): void
  (e: 'add-parent', parentId: string, childId: string): void
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

const openAddNodeMenu = async (offset: Position, position: Position) => {
  addNodeMenuProps.value.visible = true
  addNodeMenuProps.value.left = Number.MAX_VALUE
  addNodeMenuProps.value.top = Number.MAX_VALUE
  await nextTick()
  addNodeMenuProps.value.left = Math.min(
    graphContainerEl.value.offsetWidth - addNodeMenu.value.$el.offsetWidth,
    offset.x
  )
  addNodeMenuProps.value.top = Math.min(
    graphContainerEl.value.offsetHeight - addNodeMenu.value.$el.offsetHeight,
    offset.y
  )
  inputPerson.value.node = { ...position }
}

const hideAddNodeMenu = () => {
  addNodeMenuProps.value.visible = false
}

const addPersonClick = () => {
  emit('add-person', inputPerson.value)
  addNodeMenuProps.value.visible = false
}

const inputPerson = ref<InputPerson>({
  name: '',
  gender: Gender.FEMALE,
  node: {
    x: 0,
    y: 0
  }
})

const inputParent = ref<string | null>(null)

const clearInputParent = () => {
  inputParent.value = null
}

onMounted(() => {
  graph.value = cytoscape({
    container: graphEl.value,
    layout: { name: 'preset' },
    elements: {
      nodes: props.persons.map((person) => ({
        style: {
          'background-color': person.gender === Gender.MALE ? 'blue' : 'red'
        },
        position: {
          ...person.node
        },
        data: { id: person._id, ...person }
      })),
      edges: props.parents.map((parent) => ({
        data: {
          id: parent._id,
          source: parent.parent_id,
          target: parent.child_id
        }
      }))
    },
    style: [
      {
        selector: 'node',
        style: {
          label: 'data(name)',
          width: 25,
          height: 25
        }
      },
      {
        selector: 'edge',
        style: {
          width: 2,
          'line-color': 'black',
          'target-arrow-shape': 'triangle',
          'target-arrow-color': 'black',
          'curve-style': 'straight'
        }
      }
    ]
  })

  graph.value.on('dblclick', async (event: EventObjectCore) => {
    await nextTick()
    if (event.isDefaultPrevented()) {
      return
    }
    clearInputParent()
    await openAddNodeMenu(
      { x: event.originalEvent.offsetX, y: event.originalEvent.offsetY },
      event.position
    )
  })

  graph.value.on('click', async (event: EventObjectCore) => {
    await nextTick()
    if (event.isDefaultPrevented()) {
      return
    }
    clearInputParent()
    hideAddNodeMenu()
  })

  graph.value.on('dragpan', () => {
    hideAddNodeMenu()
  })

  graph.value.on('zoom', () => {
    hideAddNodeMenu()
  })

  graph.value.on('grabon', () => {
    hideAddNodeMenu()
  })

  graph.value.on('dragfreeon', 'node', (event: EventObjectNode) => {
    const person: OutputPerson = event.target.data()
    emit('move-person', person._id, { ...event.target.position() })
  })

  graph.value.on('dblclick', 'node', (event: EventObjectNode) => {
    event.preventDefault()
    const person: OutputPerson = event.target.data()
    emit('delete-person', person._id)
  })

  graph.value.on('click', 'node', (event: EventObjectNode) => {
    event.preventDefault()
    const person: OutputPerson = event.target.data()
    if (inputParent.value) {
      if (inputParent.value !== person._id) {
        emit('add-parent', inputParent.value, person._id)
      }
      clearInputParent()
    } else {
      inputParent.value = person._id
    }
  })
})

const addPersons = (persons: OutputPerson[]) => {
  persons.forEach((person) => {
    graph.value.add({
      group: 'nodes',
      style: {
        'background-color': person.gender === Gender.MALE ? 'blue' : 'red'
      },
      position: {
        ...person.node
      },
      data: { id: person._id, ...person }
    })
  })
}

const deletePersons = (persons: OutputPerson[]) => {
  persons.forEach((person) => {
    graph.value.remove(`node[_id = "${person._id}"]`)
  })
}

const addParents = (parents: Parent[]) => {
  parents.forEach((parent) => {
    graph.value.add({
      group: 'edges',
      data: {
        id: parent._id,
        source: parent.parent_id,
        target: parent.child_id
      }
    })
  })
}

const deleteParents = (parents: Parent[]) => {
  parents.forEach((parent) => {
    graph.value.remove(`edge[_id = "${parent._id}"]`)
  })
}

watch(
  () => props.persons,
  (newPersons, oldPersons) => {
    if (newPersons.length > oldPersons.length) {
      addPersons(difference(newPersons, oldPersons))
    } else if (oldPersons.length > newPersons.length) {
      deletePersons(difference(oldPersons, newPersons))
    }
  }
)

watch(
  () => props.parents,
  (newParents, oldParents) => {
    if (newParents.length > oldParents.length) {
      addParents(difference(newParents, oldParents))
    } else if (oldParents.length > newParents.length) {
      deleteParents(difference(oldParents, newParents))
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
