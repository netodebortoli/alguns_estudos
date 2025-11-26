package aristides.dev.shared.events;

import aristides.dev.shared.exceptions.DuplicateHandlerException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SuppressWarnings({"unchecked"})
@ExtendWith(MockitoExtension.class)
class EventDispatcherImplTest {

    @Test
    void shouldRegisterEventHandlers() throws NoSuchFieldException, IllegalAccessException {
        // given
        EventDispatcherImpl eventDispatcher = new EventDispatcherImpl();
        EventHandler eventHandler1 = new TestEventHandler();
        EventHandler eventHandler2 = new TestEventHandler2();

        // when
        eventDispatcher.register("TestEventHandler", eventHandler1);
        eventDispatcher.register("TestEventHandler", eventHandler2);
        eventDispatcher.register("TestEventHandler2", eventHandler2);

        // then
        Field field = eventDispatcher.getClass().getDeclaredField("eventHandlers");
        field.setAccessible(true);

        var eventHandlers = (Map<String, List<EventHandler>>) field.get(eventDispatcher);

        assertEquals(2, eventHandlers.size());
        assertEquals(2, eventHandlers.get("TestEventHandler").size());
        assertEquals(1, eventHandlers.get("TestEventHandler2").size());
    }

    @Test
    void shouldThrowErrorWhenRegisterHandlerExists() {
        // given
        EventDispatcherImpl eventDispatcher = new EventDispatcherImpl();
        EventHandler eventHandler1 = new TestEventHandler();
        EventHandler eventHandler2 = new TestEventHandler();

        // when
        eventDispatcher.register("TestEventHandler", eventHandler1);

        // then
        assertThrows(DuplicateHandlerException.class, () -> eventDispatcher.register("TestEventHandler", eventHandler2));
    }

    @Test
    void shouldRemoveHandler() throws NoSuchFieldException, IllegalAccessException {
        // given
        EventDispatcherImpl eventDispatcher = new EventDispatcherImpl();
        EventHandler eventHandler = new TestEventHandler();
        eventDispatcher.register("TestEventHandler", eventHandler);

        // when
        eventDispatcher.remove("TestEventHandler", eventHandler);

        // then
        Field field = eventDispatcher.getClass().getDeclaredField("eventHandlers");
        field.setAccessible(true);

        var eventHandlers = (Map<String, List<EventHandler>>) field.get(eventDispatcher);

        assertTrue(eventHandlers.get("TestEventHandler").isEmpty());
    }

    @Test
    void shouldClearHandlers() throws NoSuchFieldException, IllegalAccessException {
        // given
        EventDispatcherImpl eventDispatcher = new EventDispatcherImpl();
        EventHandler eventHandler = new TestEventHandler();
        eventDispatcher.register("TestEventHandler", eventHandler);

        // when
        eventDispatcher.clear();

        // then
        Field field = eventDispatcher.getClass().getDeclaredField("eventHandlers");
        field.setAccessible(true);

        var eventHandlers = (Map<String, List<EventHandler>>) field.get(eventDispatcher);

        assertTrue(eventHandlers.isEmpty());
    }

    @Test
    void shouldVerifyIfHasHandler() {
        // given
        EventDispatcherImpl eventDispatcher = new EventDispatcherImpl();
        EventHandler eventHandler1 = new TestEventHandler();
        EventHandler eventHandler2 = new TestEventHandler2();
        eventDispatcher.register("TestEventHandler1", eventHandler1);

        // then
        assertTrue(eventDispatcher.has("TestEventHandler1", eventHandler1));
        assertFalse(eventDispatcher.has("TestEventHandler1", eventHandler2));
    }

    @Test
    void shouldDispatchEvent() {
        // given
        var event = new TestEvent();
        EventDispatcherImpl eventDispatcher = new EventDispatcherImpl();
        EventHandler eventHandler = Mockito.mock(EventHandler.class);
        EventHandler eventHandler2 = Mockito.mock(EventHandler.class);
        eventDispatcher.register(event.name(), eventHandler);

        doNothing().when(eventHandler).handle(any());

        // when
        eventDispatcher.dispatch(event);

        // then
        verify(eventHandler, times(1)).handle(any());
        verify(eventHandler2, times(0)).handle(any());
    }
}

class TestEvent implements BaseEvent {
    @Override
    public String name() {
        return "TestEvent";
    }

    @Override
    public LocalDateTime timestamp() {
        return LocalDateTime.now();
    }

    @Override
    public Object payload() {
        return new Object(){};
    }
}

class TestEventHandler implements EventHandler {
    @Override
    public void handle(BaseEvent event) {
        System.out.println("TestEventHandler");
    }
}

class TestEventHandler2 implements EventHandler {
    @Override
    public void handle(BaseEvent event) {
        System.out.println("TestEventHandler2");
    }
}
