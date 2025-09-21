//
//  ResponseProcessor.swift
//  UiColorChecker
//
//  Created by Ryky CE on 13/9/25.
//

import Domain

extension Output {

  /// Transforms a config event into a Response
  public protocol ResponseProcessor {

    associatedtype Event: AnyObject
    associatedtype Response: Domain.Output.Response

    /// Transforms a config event into a Response
    func processResponse( event:Event ) -> Response

  }

}
