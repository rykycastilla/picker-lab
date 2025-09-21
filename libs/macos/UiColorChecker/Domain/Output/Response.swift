//
//  Response.swift
//  UiColorChecker
//
//  Created by Ryky CE on 13/9/25.
//

extension Output {

  public protocol ResponseValue {}

  /// Standard format for packaging information to be sent to another process
  public protocol Response {

    associatedtype Status

    var status: Status { get }
    var value: String? { get }

    /// Elapsed time (in milliseconds) since 1970 until the Response
    var timeStamp: Int { get }

  }

}
