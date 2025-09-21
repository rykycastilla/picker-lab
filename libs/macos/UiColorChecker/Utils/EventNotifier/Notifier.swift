//
//  Notifier.swift
//  UiColorChecker
//
//  Created by Ryky CE on 14/9/25.
//

extension EventNotifier {

  public class Notifier<T:AnyObject>: EventNotifier.Emitter {

    private var handlerList: [ ( T ) -> Void ] = []

    public init() {}

    public func dispatch( event:T ) {
      for handle in self.handlerList {
        handle( event )
      }
    }

    public func addObserver( handle:@escaping ( T ) -> Void ) {
      self.handlerList.append( handle )
    }

  }

}
