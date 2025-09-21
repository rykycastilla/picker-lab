//
//  runOutputSender.swift
//  UiColorChecker
//
//  Created by Ryky CE on 14/9/25.
//

import Domain

extension Output {

  /// Starts a service to observe the system and notify another process of its changes
  public static func runOutputSender<
    Event:AnyObject, Response:Domain.Output.Response,
    Emitter:Output.Emitter, ResponseProcessor:Output.ResponseProcessor, Sender:Output.Sender,
  >(
    emitter:Emitter, responseProcessor:ResponseProcessor, sender:Sender,
  ) where
    // Ensuring Event & Response are the same for all dependencies
    Emitter.Event == Event,
    ResponseProcessor.Event == Event,
    ResponseProcessor.Response == Response,
    Sender.Message == Response {
    // Listening Notifications
    emitter.addObserver() { event in
      // Processing response and re-sending
      let response: Response = responseProcessor.processResponse( event:event )
      sender.send( message:response )
    }
    // Forcing first check to ensure the system is working
    emitter.forceChecking()
  }

}
