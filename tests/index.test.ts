import EventEmitter from 'eventemitter3'
import type { Map } from 'mapbox-gl';

import syncMaps from '../src/index';

type MockMap = jest.Mocked<Map> & EventEmitter;

const createMockMap = (): MockMap => {
  const mapEmitter = new EventEmitter();
  const map = {
    getCenter: jest.fn(() => ({ lat: 0, lng: 0 })),
    getZoom: jest.fn(() => 10),
    getBearing: jest.fn(() => 0),
    getPitch: jest.fn(() => 0),
    jumpTo: jest.fn(),
    on: jest.fn((event, listener) => {
      mapEmitter.on(event, listener);
    }),
    off: jest.fn((event, listener) => {
      mapEmitter.off(event, listener);
    }),
    emit: (event: string | symbol, ...args: any[]) => mapEmitter.emit(event, ...args),
  } as unknown as MockMap; // Cast to allow adding EventEmitter methods

  return map;
};

describe('syncMaps', () => {
  test('when foo moves once, bar moves once', () => {
    const foo = createMockMap();
    const bar = createMockMap();
    syncMaps(foo, bar);

    foo.emit('move');

    expect(foo.jumpTo).toHaveBeenCalledTimes(0);
    expect(foo.getCenter).toHaveBeenCalledTimes(1);
    expect(foo.getZoom).toHaveBeenCalledTimes(1);
    expect(foo.getBearing).toHaveBeenCalledTimes(1);
    expect(foo.getPitch).toHaveBeenCalledTimes(1);

    expect(bar.jumpTo).toHaveBeenCalledTimes(1);
    expect(bar.getCenter).toHaveBeenCalledTimes(0);
    expect(bar.getZoom).toHaveBeenCalledTimes(0);
    expect(bar.getBearing).toHaveBeenCalledTimes(0);
    expect(bar.getPitch).toHaveBeenCalledTimes(0);
  });

  test('when foo moves thrice, bar moves thrice', () => {
    const foo = createMockMap();
    const bar = createMockMap();
    syncMaps(foo, bar);

    foo.emit('move');
    foo.emit('move');
    foo.emit('move');

    expect(foo.jumpTo).toHaveBeenCalledTimes(0);
    expect(foo.getCenter).toHaveBeenCalledTimes(3);
    expect(foo.getZoom).toHaveBeenCalledTimes(3);
    expect(foo.getBearing).toHaveBeenCalledTimes(3);
    expect(foo.getPitch).toHaveBeenCalledTimes(3);

    expect(bar.jumpTo).toHaveBeenCalledTimes(3);
    expect(bar.getCenter).toHaveBeenCalledTimes(0);
    expect(bar.getZoom).toHaveBeenCalledTimes(0);
    expect(bar.getBearing).toHaveBeenCalledTimes(0);
    expect(bar.getPitch).toHaveBeenCalledTimes(0);
  });

  test('when bar moves once, foo moves once', () => {
    const foo = createMockMap();
    const bar = createMockMap();
    syncMaps(foo, bar);

    bar.emit('move');

    expect(bar.jumpTo).toHaveBeenCalledTimes(0);
    expect(bar.getCenter).toHaveBeenCalledTimes(1);
    expect(bar.getZoom).toHaveBeenCalledTimes(1);
    expect(bar.getBearing).toHaveBeenCalledTimes(1);
    expect(bar.getPitch).toHaveBeenCalledTimes(1);

    expect(foo.jumpTo).toHaveBeenCalledTimes(1);
    expect(foo.getCenter).toHaveBeenCalledTimes(0);
    expect(foo.getZoom).toHaveBeenCalledTimes(0);
    expect(foo.getBearing).toHaveBeenCalledTimes(0);
    expect(foo.getPitch).toHaveBeenCalledTimes(0);
  });

  test('when bar moves thrice, foo moves thrice', () => {
    const foo = createMockMap();
    const bar = createMockMap();
    syncMaps(foo, bar);

    bar.emit('move');
    bar.emit('move');
    bar.emit('move');

    expect(bar.jumpTo).toHaveBeenCalledTimes(0);
    expect(bar.getCenter).toHaveBeenCalledTimes(3);
    expect(bar.getZoom).toHaveBeenCalledTimes(3);
    expect(bar.getBearing).toHaveBeenCalledTimes(3);
    expect(bar.getPitch).toHaveBeenCalledTimes(3);

    expect(foo.jumpTo).toHaveBeenCalledTimes(3);
    expect(foo.getCenter).toHaveBeenCalledTimes(0);
    expect(foo.getZoom).toHaveBeenCalledTimes(0);
    expect(foo.getBearing).toHaveBeenCalledTimes(0);
    expect(foo.getPitch).toHaveBeenCalledTimes(0);
  });

  test('when foo moves once, bar moves once, baz moves once', () => {
    const foo = createMockMap();
    const bar = createMockMap();
    const baz = createMockMap();
    syncMaps(foo, bar, baz);

    foo.emit('move');

    expect(foo.jumpTo).toHaveBeenCalledTimes(0);
    expect(foo.getCenter).toHaveBeenCalledTimes(1);
    expect(foo.getZoom).toHaveBeenCalledTimes(1);
    expect(foo.getBearing).toHaveBeenCalledTimes(1);
    expect(foo.getPitch).toHaveBeenCalledTimes(1);

    expect(bar.jumpTo).toHaveBeenCalledTimes(1);
    expect(bar.getCenter).toHaveBeenCalledTimes(0);
    expect(bar.getZoom).toHaveBeenCalledTimes(0);
    expect(bar.getBearing).toHaveBeenCalledTimes(0);
    expect(bar.getPitch).toHaveBeenCalledTimes(0);

    expect(baz.jumpTo).toHaveBeenCalledTimes(1);
    expect(baz.getCenter).toHaveBeenCalledTimes(0);
    expect(baz.getZoom).toHaveBeenCalledTimes(0);
    expect(baz.getBearing).toHaveBeenCalledTimes(0);
    expect(baz.getPitch).toHaveBeenCalledTimes(0);
  });

  test('when foo moves thrice, bar moves thrice, baz moves thrice', () => {
    const foo = createMockMap();
    const bar = createMockMap();
    const baz = createMockMap();
    syncMaps(foo, bar, baz);

    foo.emit('move');
    foo.emit('move');
    foo.emit('move');

    expect(foo.jumpTo).toHaveBeenCalledTimes(0);
    expect(foo.getCenter).toHaveBeenCalledTimes(3);
    expect(foo.getZoom).toHaveBeenCalledTimes(3);
    expect(foo.getBearing).toHaveBeenCalledTimes(3);
    expect(foo.getPitch).toHaveBeenCalledTimes(3);

    expect(bar.jumpTo).toHaveBeenCalledTimes(3);
    expect(bar.getCenter).toHaveBeenCalledTimes(0);
    expect(bar.getZoom).toHaveBeenCalledTimes(0);
    expect(bar.getBearing).toHaveBeenCalledTimes(0);
    expect(bar.getPitch).toHaveBeenCalledTimes(0);

    expect(baz.jumpTo).toHaveBeenCalledTimes(3);
    expect(baz.getCenter).toHaveBeenCalledTimes(0);
    expect(baz.getZoom).toHaveBeenCalledTimes(0);
    expect(baz.getBearing).toHaveBeenCalledTimes(0);
    expect(baz.getPitch).toHaveBeenCalledTimes(0);
  });
});