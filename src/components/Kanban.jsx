import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { STATUS_OPTIONS } from "./constants";
import { TaskCard } from "./TaskCard";
import { useTaskContext } from "../context/context";

export const KanbanView = ({ tasks }) => {
  const { setTasks } = useTaskContext();

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const taskToUpdate = tasks.find((task) => {
      return task.id.toString() === draggableId;
    });

    if (!taskToUpdate) {
      return;
    }

    const updatedTasks = tasks.map((task) =>
      task.id.toString() === draggableId
        ? { ...task, status: destination.droppableId }
        : task
    );
    setTasks(updatedTasks);
  };

  const tasksByStatus = STATUS_OPTIONS.reduce((acc, { value }) => {
    acc[value] = tasks.filter((task) => task.status === value);
    return acc;
  }, {});

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4">
        {STATUS_OPTIONS.map(({ value, label, color }) => (
          <Droppable key={value} droppableId={value}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`flex-1 p-4 rounded min-h-[200px] transition-colors duration-200 ${
                  snapshot.isDraggingOver ? "bg-gray-200" : color.split(" ")[0]
                }`}
              >
                <h2 className={`text-lg font-bold mb-2 ${color.split(" ")[1]}`}>
                  {label}
                </h2>
                <div className="min-h-[100px]">
                  {tasksByStatus[value]?.map((task, index) => {
                    return (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              opacity: snapshot.isDragging ? 0.8 : 1,
                            }}
                            className="mb-2"
                          >
                            <TaskCard task={task} compact={true} />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};
