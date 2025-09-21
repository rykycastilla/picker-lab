//
//  Encoder.swift
//  UiColorChecker
//
//  Created by Ryky CE on 14/9/25.
//

extension Output {

  /// Transforms information from a specific type into another format
  public protocol Encoder {

    associatedtype From
    associatedtype To

    /// Transforms information from a specific type into another format
    func encode( from:From ) -> To

  }

}
