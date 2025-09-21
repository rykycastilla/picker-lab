//
//  Console.swift
//  UiColorChecker
//
//  Created by Ryky CE on 14/9/25.
//

import Application
import Darwin

extension Output {

  public class Console: Application.Output.Sender {

    private var usingStdout = false

    public typealias Message = String

    public init() {}

    /// Enables standar output for the Console
    private func enableStdout() {
      setbuf( stdout, nil )
      self.usingStdout = true
    }

    /// Send messages to the Console
    public func send( message:String ) {
      // Activating stdout
      if !self.usingStdout { self.enableStdout() }
      print( message )
    }

  }

}
