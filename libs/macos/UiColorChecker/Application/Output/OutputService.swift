//
//  OutputService.swift
//  UiColorChecker
//
//  Created by Ryky CE on 14/9/25.
//

import Domain

extension Output {

  public class OutputService<
    T: Domain.Output.Response,
    Encoder:Output.Encoder, Sender:Output.Sender
  >: Output.Sender where
    Encoder.From == T,
    Encoder.To == String,
    Sender.Message == String {

    public typealias Message = T

    private let encoder: Encoder
    private let sender: Sender

    public init( encoder:Encoder, sender:Sender ) {
      self.encoder = encoder
      self.sender = sender
    }

    /// Prepare `Response` data to be sent to anothe process
    public func send( message:T ) {
      let output: String = self.encoder.encode( from:message )
      self.sender.send( message:output )
    }

  }

}
