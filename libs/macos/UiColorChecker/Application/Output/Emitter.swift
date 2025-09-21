//
//  Emitter.swift
//  UiColorChecker
//
//  Created by Ryky CE on 13/9/25.
//

extension Output {

  /// Event Emitter to be used to observe system behaviors
  public protocol Emitter {

    associatedtype Event: AnyObject

    /// Adds a handler to be executed when the observer detects notifications
    func addObserver( handle:@escaping ( Event ) -> Void )

    /// Used to force the internal logic to notify events. It may or may not notify new events
    func forceChecking()

  }

}
