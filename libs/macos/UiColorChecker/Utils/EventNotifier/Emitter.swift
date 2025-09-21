//
//  Emitter.swift
//  UiColorChecker
//
//  Created by Ryky CE on 14/9/25.
//

extension EventNotifier {

  public protocol Emitter {
    associatedtype Event: AnyObject
    func addObserver( handle:@escaping ( Event ) -> Void )
  }

}
