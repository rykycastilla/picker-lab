//
//  main.swift
//  UiColorChecker
//
//  Created by Ryky CE on 13/9/25.
//

import Application
import Domain
import Infrastructure
import Utils

extension EventNotifier.Notifier<Domain.Color.ColorEvent>: Application.Color.AccentNotifier {}

// Creating Emitter
let notifier = EventNotifier.Notifier<Domain.Color.ColorEvent>()
let colorConfig = Infrastructure.Color.MacSystemColorConfig()
let colorSystem = Infrastructure.Color.MacUiColorSystem()
let accentEmitter = Application.Color.AccentEmitter(
  notifier:notifier, colorConfig:colorConfig, colorSystem:colorSystem,
)

// Creating Output Service with console implementation
let encoder = Infrastructure.Color.ColorResponderJSONEncoder()
let sender = Infrastructure.Output.Console()
let outputService = Application.Output.OutputService( encoder:encoder, sender:sender )

// Launching Service to detect accent changes and notify it
let responseProcessor = Application.Color.ColorResponseProcessor()
Application.Output.runOutputSender(
  emitter:accentEmitter, responseProcessor:responseProcessor, sender:outputService,
)
keepRunning()
