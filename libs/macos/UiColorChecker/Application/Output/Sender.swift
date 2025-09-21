//
//  Sender.swift
//  UiColorChecker
//
//  Created by Ryky CE on 13/9/25.
//

extension Output {

  /// Sends a mesage to another process
  public protocol Sender {

    associatedtype Message

    /// Sends a mesage to another process
    func send( message:Message )

  }

}
